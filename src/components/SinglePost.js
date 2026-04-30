import React from "react";
import { Link } from "react-router-dom";

export default function SinglePost() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center text-pcWhite">
        <p className="text-lg mb-4">Post not found.</p>
        <Link to="/" className="underline hover:text-myBlue transition-colors">Back to Home</Link>
      </div>
    </div>
  );
}
