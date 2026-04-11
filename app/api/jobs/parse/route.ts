import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { description, background } = await req.json();

    if (!description || description.trim().length < 50) {
      return NextResponse.json(
        { error: "Job description is too short or missing." },
        { status: 400 }
      );
    }

    // ── Call 1: Extract structured fields ──────────────────────────────
    const extractRes = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: "You are a precise data extractor. You only respond with valid JSON objects. No markdown, no explanation, no extra text.",
        },
        {
          role: "user",
          content: `Extract structured information from this job description.
Respond ONLY with a valid JSON object matching this exact shape:
{
  "title": "string",
  "company": "string",
  "location": "string (city/country or Remote)",
  "type": "Full-time | Part-time | Contract | Internship",
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "summary": "2-sentence plain English summary of the role"
}

Job description:
${description}`,
        },
      ],
    });

    const rawJson = extractRes.choices[0].message.content
      ?.replace(/```json|```/g, "")
      .trim() ?? "{}";

    const parsed = JSON.parse(rawJson);

    // ── Call 2: Generate cover letter ───────────────────────────────────
    const coverRes = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You are an expert technical writer who writes sharp, confident cover letters for software engineers.",
        },
        {
          role: "user",
          content: `Write a confident, specific cover letter opening paragraph (3–4 sentences) for this role.

Rules:
- No generic openers ("I am excited to apply", "I believe I am a great fit")
- Reference the company and role specifically
- Sound like a senior engineer, not a student
- Output only the paragraph — no greeting, no sign-off

Role: ${parsed.title} at ${parsed.company}
Skills needed: ${parsed.skills.join(", ")}
Summary: ${parsed.summary}
${background ? `Applicant background: ${background}` : ""}`,
        },
      ],
    });

    const coverLetter = coverRes.choices[0].message.content?.trim() ?? "";

    return NextResponse.json({ ...parsed, coverLetter }, { status: 200 });
  } catch (err) {
    console.error("[POST /api/jobs/parse]", err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse AI response. Try again." },
        { status: 502 }
      );
    }

    if (
      typeof err === "object" &&
      err !== null &&
      "status" in err &&
      (err as { status: number }).status === 429
    ) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}