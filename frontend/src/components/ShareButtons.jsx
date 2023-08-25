/* eslint-disable react/prop-types */
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ClipboardDocumentIcon, AtSymbolIcon } from "@heroicons/react/24/outline";

const ShareButtons = ({ recipeName, recipeId }) => {
  // state
  const [copied, setCopied] = useState(false);

  // some calculated values
  const shareLink = window.location.origin + `/recipe/${recipeId}`;
  const encodedSubject = encodeURIComponent(`WBS Cookbook - ${recipeName}`);
  const encodedBody = encodeURIComponent(`Check out this awesome recipe:\n${shareLink}`);
  const encodedLink = `mailto:?Subject=${encodedSubject}&body=${encodedBody}`;

  return (
    <div className="space-x-4">
    {/* Share Link Button */}
      <CopyToClipboard text={shareLink} onCopy={() => setCopied(true)}>
        <button className="cursor-pointer transition-all duration-300 ease-in-out bg-white opacity-75 text-current text-base border-none rounded-lg px-10 py-2 outline-none mt-4 hover:bg-grey-500 hover:scale-110 transform-gpu">
          Copy link
        </button>
      </CopyToClipboard>
  
      {/* Share via Email button */}
      <button onClick={() => (window.location = encodedLink)} className="cursor-pointer transition-all duration-300 ease-in-out bg-white opacity-75 text-current text-base border-none rounded-lg px-10 py-2 outline-none mt-4 hover:bg-white-500 hover:scale-110 transform-gpu">
        Share via Email
      </button>
      {copied && <span className="block text-blue-500 mt-2">Link copied to clipboard!</span>}
    </div>
  );
};

export default ShareButtons;
