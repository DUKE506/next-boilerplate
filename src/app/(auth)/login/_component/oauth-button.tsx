import React from "react";
import Image from "next/image";

const OAuthButton = ({ socialName }: { socialName: string }) => {
  console.log(socialName);
  switch (socialName) {
    case "Kakao":
      return (
        <button
          className="w-full py-2 border rounded-sm overflow-hidden hover:cursor-pointer hover:bg-gray-200/30"
          type="submit"
        >
          <span className="text-sm">카카오 로그인</span>
        </button>
      );
    case "Google":
      return (
        <button
          className="w-full py-2 border rounded-sm overflow-hidden hover:cursor-pointer hover:bg-gray-200/30"
          type="submit"
        >
          <span className="text-sm">구글 로그인</span>
        </button>
      );
    default:
      return <button>로그인</button>;
  }
};

export default OAuthButton;
