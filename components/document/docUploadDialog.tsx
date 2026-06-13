// components/document-upload-dialog.tsx
"use client";

import { useState, useRef } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { allowedTypes } from "@/app/data/data";

interface DocumentUploadDialogProps {
  onUploadSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function DocumentUploadDialog({
  onUploadSuccess,
  trigger,
}: DocumentUploadDialogProps) {
  const { organization } = useOrganization();
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [documentName, setDocumentName] = useState("");
  //   const [documentContent, setDocumentContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "File type not supported. Please upload .txt, .pdf, .doc, .docx, or .md files",
      );
      return;
    }

    setSelectedFile(file);
    setDocumentName(file.name.replace(/\.[^/.]+$/, "")); // Remove extension
  };

  // Handle upload
  const handleUpload = async () => {
    if (!organization || !user || !selectedFile) {
      toast.error("Please select a file");
      return;
    }

    if (!documentName.trim()) {
      toast.error("Please enter a document name");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("name", documentName);
    formData.append("organizationId", organization.id);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Document uploaded successfully!");

        // Reset form
        setDocumentName("");
        setSelectedFile(null);
        setIsOpen(false);

        // Call success callback
        onUploadSuccess?.();
      } else {
        const error = await response.json();
        toast.error(error.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  // Reset form when dialog closes
  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form state
      setDocumentName("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            className="
            rounded-sm
            bg-linear-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
            text-white
            shadow-lg
            cursor-pointer
          "
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload Document
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-145 rounded-3xl border-0 bg-white shadow-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">
            Upload Document
          </DialogTitle>

          <DialogDescription className="text-gray-500">
            Upload a document and let AI analyze, summarize, and extract
            insights.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div>
            <label className="block text-sm font-medium mb-2">
              Document Name *
            </label>

            <Input
              placeholder="Enter document name"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              disabled={isUploading}
              className="
              h-11
              rounded-xl
              border-slate-200
              bg-slate-50
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:border-blue-500
            "
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Upload File
            </label>

            <div
              className="
              rounded-2xl
              border-2
              border-dashed
              border-slate-300
              bg-slate-50
              p-8
              text-center
              transition-all
              duration-200
              hover:border-blue-500
              hover:bg-blue-50
            "
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".txt,.pdf,.doc,.docx,.md"
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />

              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-linear-to-br
                    from-blue-500
                    to-indigo-600
                    shadow-lg
                  "
                  >
                    <Upload className="h-8 w-8 text-white" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {selectedFile
                        ? "File Selected"
                        : "Click to upload your document"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Supports PDF, DOC, DOCX, TXT and Markdown files
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Maximum file size: 10 MB
                    </p>
                  </div>

                  {selectedFile && (
                    <div className="w-full max-w-md rounded-xl border bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="font-medium text-sm truncate">
                            {selectedFile.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);

                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className="rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isUploading}
            className="
            rounded-xl
            border-slate-300
            bg-white
            text-slate-700
            hover:bg-slate-100
            cursor-pointer
          "
          >
            Cancel
          </Button>

          <Button
            onClick={handleUpload}
            disabled={isUploading || !documentName.trim()}
            className="
            rounded-xl
            bg-linear-to-br
            from-blue-600
            via-indigo-600
            to-purple-600
            text-white
            shadow-lg
            transition-all
            duration-200
            hover:scale-[1.02]
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            disabled:text-slate-200
            disabled:shadow-none
          "
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
