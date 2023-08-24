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
    <div className="">
      {/* Share Link Button */}
      <CopyToClipboard text={shareLink} onCopy={() => setCopied(true)}>
        <button className="">
          <ClipboardDocumentIcon className="" /> Copy link
        </button>
      </CopyToClipboard>

      {/* Share via Email button */}
      <button onClick={() => (window.location = encodedLink)} className="">
        <AtSymbolIcon className="" />
        Share via Email
      </button>
      {copied && <span className="">Link copied to clipboard!</span>}
    </div>
  );
};

export default ShareButtons;
