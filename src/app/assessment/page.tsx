"use client";

import React from "react";
import { AssessmentForm } from "@/components/assessment/AssessmentForm";
import Link from "next/link";

export default function AssessmentPage() {
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-emerald-600">Carbon Assessment</h1>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </header>

      <section id="assessment-panel" className="mt-6">
        <AssessmentForm />
      </section>

    </main>
  );
}
