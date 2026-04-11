import { ParseForm } from "@/components/parse/ParseForm";

export default function AddJobPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-heading font-bold text-xl mb-1">Add a job</h2>
        <p className="text-sm text-muted-foreground">
          Paste any job description — AI extracts every detail and writes a
          tailored cover letter in seconds.
        </p>
      </div>
      <ParseForm />
    </div>
  );
}