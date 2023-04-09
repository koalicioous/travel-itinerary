/* eslint-disable react/no-unescaped-entities */
import MainLayout from "@/layouts/main";

const Terms = () => {
  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl py-8">
        <h1 className="text-2xl font-bold mb-4">
          TERMS AND CONDITIONS OF SERVICE AGREEMENT
        </h1>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">1. Service Description</h2>
          <p className="leading-loose mb-4">
            EasyFly acts as a flight ticket broker and helps customers to obtain
            flight itinerary. Once the user obtains the itinerary, EasyFly
            encourages them to buy the real ticket by contacting us through
            email.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">2. Use of Itinerary</h2>
          <p className="leading-loose mb-4">
            Users can use the itinerary generated from the app for any legal
            purpose, such as visa application or onward ticket. However, EasyFly
            is not responsible for any rejection of visa or entry into any
            country.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">3. Booking Reference</h2>
          <p className="leading-loose mb-4">
            The booking reference provided by EasyFly should be verifiable in
            the airline's website. However, please note that the airline may
            cancel the order for any reason, and EasyFly shall not be held
            responsible for any losses or damages incurred as a result of such
            cancellation.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">
            4. Changes and Cancellations
          </h2>
          <p className="leading-loose mb-4">
            EasyFly is not responsible for any changes made to the flight
            schedule or cancellation of the flight by the airline. Any refunds
            or cancellations shall be subject to the airline's terms and
            conditions.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">5. Right to Refuse Service</h2>
          <p className="leading-loose mb-4">
            EasyFly reserves the right to refuse service to any user, without
            providing any reason.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">
            6. Modification of Terms and Conditions
          </h2>
          <p className="leading-loose mb-4">
            EasyFly may modify these terms and conditions at any time, without
            prior notice to the user. By continuing to use the service after the
            modification of the terms and conditions, you agree to be bound by
            the updated terms and conditions.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">
            7. Disclaimer of Warranties
          </h2>
          <p className="leading-loose mb-4">
            The Service is provided "as is" and without warranties of any kind,
            either express or implied, including, without limitation, warranties
            of merchantability, fitness for a particular purpose, and
            non-infringement. EasyFly does not warrant that the Service will be
            uninterrupted or error-free.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">8. Limitation of Liability</h2>
          <p className="leading-loose mb-4">
            EasyFly is not responsible for any losses or damages, whether direct
            or indirect, incurred as a result of the use of our service.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">
            9. Governing Law and Dispute Resolution
          </h2>
          <p className="leading-loose mb-4">
            The use of EasyFly's service shall be governed by the laws of
            Indonesia. Any disputes arising out of or in connection with the use
            of our service shall be resolved through arbitration in accordance
            with the rules of the Indonesian Law.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">10. Entire Agreement</h2>
          <p className="leading-loose mb-4">
            This Agreement constitutes the entire agreement between you and
            EasyFly with respect to the use of the Service and supersedes all
            prior or contemporaneous communications and proposals, whether oral
            or written, between you and EasyFly.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">11. Severability</h2>
          <p className="leading-loose mb-4">
            If any provision of this Agreement is found to be invalid or
            unenforceable, the remaining provisions shall remain in full force
            and effect.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">12. Contact Information</h2>
          <p className="leading-loose mb-4">
            If you have any questions or concerns about our service or these
            terms and conditions, please contact us at{" "}
            <span className="font-bold font-mono">fly4visa@gmail.com</span>.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;
