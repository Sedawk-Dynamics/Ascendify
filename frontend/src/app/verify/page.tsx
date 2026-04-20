"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/Button";
import {
  Search,
  ShieldCheck,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  BookOpen,
  Calendar,
  BadgeCheck,
  GraduationCap,
  Layers,
  ExternalLink,
} from "lucide-react";

interface CertificateData {
  holderName?: string;
  name?: string;
  program?: string;
  programTitle?: string;
  issueDate?: string;
  issuedAt?: string;
  validity?: string;
  status?: string;
  certificateId?: string;
  college?: string;
  birthDate?: string;
  batch?: string;
  certificateHostUrl?: string;
}

const steps = [
  {
    icon: FileText,
    title: "Enter ID",
    description: "Enter your unique certificate ID in the search field above.",
  },
  {
    icon: ShieldCheck,
    title: "We Verify",
    description:
      "Our system checks the certificate against our secure database.",
  },
  {
    icon: CheckCircle2,
    title: "Get Results",
    description:
      "Instantly see the certificate details and verification status.",
  },
];

export default function VerifyPage() {
  const [certId, setCertId] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "found" | "not-found" | "error"
  >("idle");
  const [certificate, setCertificate] = useState<CertificateData | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setStatus("loading");
    setCertificate(null);
    try {
      const res = await fetch(
        `/_/backend/api/certificates/verify/${encodeURIComponent(certId.trim())}`
      );
      if (res.ok) {
        const data = await res.json();
        setCertificate(data.certificate || data);
        setStatus("found");
      } else if (res.status === 404) {
        setStatus("not-found");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-cyan mb-6">
            Certificate Verification
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Verify Your <span className="text-cyan">Certificate</span>
          </h1>
          <p className="text-text-on-dark text-lg max-w-2xl mx-auto">
            Confirm the authenticity of your Ascendify certificate by entering
            the unique certificate ID below.
          </p>
        </div>
      </section>

      {/* Verification Card */}
      <section className="bg-light-bg py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <form onSubmit={handleVerify} className="flex gap-3">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light"
                />
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g., ASC-2024-001)"
                  className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm transition-all"
                  required
                />
              </div>
              <PrimaryButton type="submit" disabled={status === "loading"}>
                {status === "loading" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  "Verify"
                )}
              </PrimaryButton>
            </form>

            {/* Results */}
            {status === "found" && certificate && (
              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <BadgeCheck size={22} className="text-green-600" />
                  <h3 className="font-semibold text-green-800 text-lg">
                    Certificate Verified
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User size={16} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-green-600 font-medium">
                        Holder Name
                      </p>
                      <p className="text-sm text-green-900 font-semibold">
                        {certificate.holderName || certificate.name || "N/A"}
                      </p>
                    </div>
                  </div>
                  {certificate.college && (
                    <div className="flex items-start gap-3">
                      <GraduationCap size={16} className="text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-green-600 font-medium">
                          College
                        </p>
                        <p className="text-sm text-green-900 font-semibold">
                          {certificate.college}
                        </p>
                      </div>
                    </div>
                  )}
                  {certificate.batch && (
                    <div className="flex items-start gap-3">
                      <Layers size={16} className="text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-green-600 font-medium">
                          Batch
                        </p>
                        <p className="text-sm text-green-900 font-semibold">
                          {certificate.batch}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <BookOpen size={16} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-green-600 font-medium">
                        Program
                      </p>
                      <p className="text-sm text-green-900 font-semibold">
                        {certificate.program ||
                          certificate.programTitle ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-green-600 font-medium">
                        Issue Date
                      </p>
                      <p className="text-sm text-green-900 font-semibold">
                        {certificate.issueDate ||
                          certificate.issuedAt ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={16} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-green-600 font-medium">
                        Certificate Credential
                      </p>
                      <p className="text-sm text-green-900 font-semibold">
                        {certificate.certificateId || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                {certificate.certificateHostUrl && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <a
                      href={certificate.certificateHostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink size={16} />
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            )}

            {status === "not-found" && (
              <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200 flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800">
                    Certificate Not Found
                  </h3>
                  <p className="text-sm text-red-600 mt-1">
                    No certificate was found with ID &ldquo;{certId}&rdquo;.
                    Please check the ID and try again.
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200 flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800">
                    Verification Error
                  </h3>
                  <p className="text-sm text-red-600 mt-1">
                    Something went wrong during verification. Please try again
                    later.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Verifying your Ascendify certificate is quick and easy.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5 relative">
                  <step.icon size={28} className="text-white" />
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-cyan text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-text-heading mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
