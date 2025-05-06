import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
//APIs
import GetPolicies from "../../api-client/Policies/GetPolicies";

const Policy = () => {
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState([]);

  //Api handler
  const {
    status,
    error,
    data: policyData,
  } = useQuery(["policydata"], GetPolicies, {
    staleTime: 18000000, // 5 hours
  });
  useEffect(() => {
    if (status === "success" && policyData) {
      setPolicies(policyData);
      setLoading(false);
    }
  }, [policyData, status]);

  return (
    <>
      {loading ? (
        <div className="buffer-space">
          <div className="buffer-loader home"></div>
        </div>
      ) : (
        <div className="policies-container">
          <h1>Matar Residence privacy policy</h1>
          <p>Welcome to Matar Residence</p>
          <p>Last Updated: March 14, 2023.</p>
          <p>1. Information We Collect:

We collect personal information provided by guests during the reservation process, including but not limited to names, contact details, payment information, and any special requests. Additionally, we may gather non-personal information such as IP addresses, browser types, and device information to enhance your online experience.
</p><p>
2. How We Use Your Information:

The personal information we collect is used for reservation management, communication with guests, and to enhance our services. Non-personal information is utilized for website analytics and improvements. We do not sell, rent, or trade your personal information to third parties for marketing purposes.
</p><p>
3. Cookies and Tracking Technologies:

Our website may use cookies and similar technologies to improve user experience and for analytical purposes. You can modify your browser settings to manage cookie preferences; however, please note that some features of our website may be impacted.
</p><p>
4. Third-Party Services:

We may engage third-party service providers to assist with reservation management, payment processing, and other services. These providers have access to your personal information only as necessary to perform their functions and are obligated to maintain its confidentiality.
</p><p>
5. Security Measures:

We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security, and you acknowledge and provide information at your own risk.
</p><p>
6. Your Choices:

You have the right to access, correct, or delete your personal information. If you wish to exercise these rights or have any concerns about your privacy, please contact us at [contact@yourhotelname.com]. Additionally, you can opt-out of promotional communications by following the unsubscribe instructions provided in such communications.
</p><p>
7. Children's Privacy:

Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
</p><p>
8. Changes to this Privacy Policy:

We may update this Privacy Policy periodically. Any changes will be effective immediately upon posting the revised policy on our website. We encourage you to review this policy regularly for any updates.</p>
          
        </div>
      )}
    </>
  );
};

export default Policy;
