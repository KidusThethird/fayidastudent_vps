import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React from "react";

interface ShowResultItems {
  reslultText: string;
}
export default function ShowResult({
  reslultText,
  incorrectquestions,
  questions,
}: any) {
  const Result = reslultText;
  const IncorrectQuestions = incorrectquestions;
  const Questions = questions;

  function formatTextToHTML(text: any) {
    if (!text) {
      return ""; // Return an empty string if text is null or undefined
    }
    const formattedText = text
      .replace(/\^(.*?)\^/g, "<sup>$1</sup>") // Matches ^^superscript^^
      .replace(/\*\*\*(.*?)\*\*\*/g, "<sub>$1</sub>") // Matches ***subscript***
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Matches **bold**
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Matches *italic*
      .replace(/_(.*?)_/g, "<u>$1</u>")
      .replace(/&&.*?pi/g, "π"); // Matches _underline_

    const renderedHTML = (
      <div dangerouslySetInnerHTML={{ __html: formattedText }} />
    );
    return renderedHTML;
  }

  console.log("Questions Get: " + JSON.stringify(Questions));
  return (
    <div className="mx-5">
      <div className="my-4 flex space-x-3 mx-auto w-fit">
        <h1>Exam Result: </h1>
        <h1>{Result}.</h1>
      </div>
      {IncorrectQuestions.length == 0 ? (
        <div className="border-2 py-3 border-primaryColor">
          <h1 className="text-primaryColor text-2xl mx-auto w-fit text-center">
            Congratulations! Keep up the good work!
          </h1>

          <div className="w-full flex">
            <Link
              // href={"/mock_package"}
              href={"/mock_package/selectmainfolder"}
              className="text-secondaryColor my-4 mx-auto w-fit "
            >
              Go back to Mock Exam Packages
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <h1>Here is the review of your exam.</h1>
        </div>
      )}
      <div></div>
      <div className="my-7">
        {/* {Questions.map((que: any, Qindex: any) => {
          return (
            <div>
              {IncorrectQuestions.map((IncQuestion: any, Incindex: any) => {
                return (
                  <div className="py-4">
                    {Qindex == Incindex ? (
                      <div className="bg-red-300 bg-opacity-70 p-3">
                        <div>
                          <h1 className="  px-6">Incorrect</h1>
                          <h1>Q: {que.question}</h1>
                          <h1>A: {que.choiseA}</h1>
                          <h1>B: {que.choiseB}</h1>
                          <h1>C: {que.choiseC}</h1>
                          <h1>D: {que.choiseD}</h1>
                          <h1>Correct Choce: {que.correctChoice}</h1>

                          <h1>Explanation: {que.correction}</h1>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* <div>
                          <h1>Q: {que.question}</h1>
                          <h1>A: {que.choiseA}</h1>
                          <h1>B: {que.choiseB}</h1>
                          <h1>C: {que.choiseC}</h1>
                          <h1>D: {que.choiseD}</h1>
                          <h1>Correct Choce: {que.correctChoice}</h1>
                          <h1 className=" bg-green-200 px-6">Correct</h1>
                          <h1>Explanation: {que.correction}</h1>
                        </div> 
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })} */}
        {Questions?.map((que: any, Qindex: any) => {
          const foundIncorrect = IncorrectQuestions.includes(Qindex);

          return (
            <div key={Qindex} className="py-4">
              {foundIncorrect ? (
                <div className="bg-red-300 bg-opacity-70 p-3">
                  <h1 className="px-6">Incorrect</h1>
                  <h1 className="flex gap-2">
                    Q: {formatTextToHTML(que.question)}
                  </h1>
                  <h1 className="flex gap-2">
                    A: {formatTextToHTML(que.choiseA)}
                  </h1>
                  <h1 className="flex gap-2">
                    B: {formatTextToHTML(que.choiseB)}
                  </h1>
                  <h1 className="flex gap-2">
                    C: {formatTextToHTML(que.choiseC)}
                  </h1>
                  <h1 className="flex gap-2">
                    D: {formatTextToHTML(que.choiseD)}
                  </h1>
                  <h1 className="flex gap-2">
                    Correct Choice: {que.correctChoice}
                  </h1>
                  <h1>Explanation: {formatTextToHTML(que.correction)}</h1>
                  {que.correctionImage && (
                    <div className="col-span-1">
                      <img
                        // src={`${apiUrl}/upload_assets/images/correction_images/${que.correctionImage}`}
                        src={que?.correctionImageUrl}
                        alt="Correction Image"
                        className="  rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h1 className="flex gap-2">
                    Q: {formatTextToHTML(que.question)}
                  </h1>
                  <h1 className="flex gap-2">
                    A: {formatTextToHTML(que.choiseA)}
                  </h1>
                  <h1 className="flex gap-2">
                    B: {formatTextToHTML(que.choiseB)}
                  </h1>
                  <h1 className="flex gap-2">
                    C: {formatTextToHTML(que.choiseC)}
                  </h1>
                  <h1 className="flex gap-2">
                    D: {formatTextToHTML(que.choiseD)}
                  </h1>
                  <h1 className="flex gap-2">
                    Correct Choice: {que.correctChoice}
                  </h1>
                  <h1 className="bg-green-200 px-6">Correct</h1>
                  <h1>Explanation: {formatTextToHTML(que.correction)}</h1>
                  {que.correctionImage && (
                    <div className="col-span-1">
                      <img
                        //  src={`${apiUrl}/upload_assets/images/correction_images/${que.correctionImage}`}
                        src={que?.correctionImageUrl}
                        alt="Correction Image"
                        className="  rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
