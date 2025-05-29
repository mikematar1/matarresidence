import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
//APIs
import GetFAQ from "../../api-client/Policies/GetFAQ";

const FAQ = () => {
  const [loading, setLoading] = useState(true);
  const [faq, setFaq] = useState([]);

  //Api handler
  const {
    status,
    error,
    data: faqData,
  } = useQuery(["faqdata"], GetFAQ, {
    staleTime: 18000000, // 5 hours
  });
  useEffect(() => {
    if (status === "success" && faqData) {
      setFaq(faqData);
      setLoading(false);
    }
  }, [faqData, status]);
  return (
    <>
      {loading ? (
        <div className="buffer-space">
          <div className="buffer-loader home"></div>
        </div>
      ) : (
        <div className="faq-container">
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
          {faq.map((item, index) => (
            <div className="faq" key={index}>
              <p className="faq-question">{item.question}</p>
              <p className="faq-response">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FAQ;
