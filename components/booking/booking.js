import React, { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";
import { format } from "date-fns";
import { RiCalendarEventLine } from "react-icons/ri";

const Booking = () => {
  const [bookingId, setBookingId] = useState("");
  const [bookingRefNo, setBookingRefNo] = useState("");
  const [client, setClient] = useState("");
  const [memberId, setMemberId] = useState("");
  const [residenceCountry, setResidenceCountry] = useState("");
  const [property, setProperty] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [numberOfExtraBeds, setNumberOfExtraBeds] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [roomType, setRoomType] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const pdfRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("jspdf").then((module) => {
        const jsPDF = module.default;
        window.jsPDF = jsPDF;
      });
    }
  }, []);

  const generatePDF = () => {
    if (typeof window !== "undefined" && typeof window.jsPDF !== "undefined") {
      const pdf = new window.jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Apply background color
      pdf.setFillColor(255, 255, 255); // Set fill color (white)
      pdf.rect(0, 0, pageWidth, pageHeight, "F"); // Draw a filled rectangle as the background

      // Add Heading
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0); // Set text color (black)
      pdf.text("Booking Confirmation", 20, 20);

      // Add Subheading
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Set text color (black)
      pdf.text(
        "Please present either an electronic or paper copy of your booking confirmation upon check-in.",
        20,
        30
      );

      // Add Border
      pdf.setDrawColor(0, 0, 0); // Set border color (black)
      pdf.setLineWidth(1); // Set border width (1px)
      pdf.rect(10, 40, pageWidth - 20, pageHeight - 50); // Draw a border around the content

      // Add Content
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Set text color (black)

      // Fixed Width for Labels
      const labelWidth = 50;

      // First Column
      pdf.setFont("helvetica", "normal");
      pdf.setFontStyle("normal");
      pdf.text("Booking ID:", 20, 50);
      pdf.text("Booking Reference No:", 20, 60);
      pdf.text("Client:", 20, 70);
      pdf.text("Member ID:", 20, 80);
      pdf.text("Country of Residence:", 20, 90);
      pdf.text("Property:", 20, 100);
      pdf.text("Address:", 20, 110);

      pdf.setFont("helvetica", "bold");
      pdf.setFontStyle("bold");
      pdf.text(bookingId, 20 + labelWidth, 50);
      pdf.text(bookingRefNo, 20 + labelWidth, 60);
      pdf.text(client, 20 + labelWidth, 70);
      pdf.text(memberId, 20 + labelWidth, 80);
      pdf.text(residenceCountry, 20 + labelWidth, 90);
      pdf.text(property, 20 + labelWidth, 100);
      pdf.text(address, 20 + labelWidth, 110);

      // Second Column
      // Second Column
      pdf.setFont("helvetica", "normal");
      pdf.setFontStyle("normal");
      pdf.text("Number of Rooms:", pageWidth / 2 + 10, 50);
      pdf.text("Number of Extra Beds:", pageWidth / 2 + 10, 60);
      pdf.text("Number of Adults:", pageWidth / 2 + 10, 70);
      pdf.text("Number of Children:", pageWidth / 2 + 10, 80);
      pdf.text("Room Type:", pageWidth / 2 + 10, 90);
      pdf.text("Arrival:", pageWidth / 2 + 10, 100);
      pdf.text("Departure:", pageWidth / 2 + 10, 110);

      pdf.setFont("helvetica", "bold");
      pdf.setFontStyle("bold");
      pdf.text(numberOfRooms, pageWidth / 2 + 10 + labelWidth, 50);
      pdf.text(numberOfExtraBeds, pageWidth / 2 + 10 + labelWidth, 60);
      pdf.text(numberOfAdults, pageWidth / 2 + 10 + labelWidth, 70);
      pdf.text(numberOfChildren, pageWidth / 2 + 10 + labelWidth, 80);
      pdf.text(roomType, pageWidth / 2 + 10 + labelWidth, 90);
      pdf.text(arrival, pageWidth / 2 + 10 + labelWidth, 100); // New line for Arrival
      pdf.text(departure, pageWidth / 2 + 10 + labelWidth, 110); // New line for Departure

      pdf.save(`booking-${format(new Date(), "yyyyMMdd-HHmmss")}.pdf`);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSaveAsPDF = () => {
    generatePDF();
  };

  if (showPreview) {
    return (
      <div className="p-4">
        <div ref={pdfRef}>
          <h1 className="text-xl font-bold">Booking Confirmation</h1>
          <p className="py-4">
            Please present either an electronic or paper copy of your booking
            confirmation upon check-in.
          </p>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <p>
                <strong>Booking ID:</strong> {bookingId}
              </p>
              <p>
                <strong>Booking Reference No:</strong> {bookingRefNo}
              </p>
              <p>
                <strong>Client:</strong> {client}
              </p>
              <p>
                <strong>Member ID:</strong> {memberId}
              </p>
              <p>
                <strong>Country of Residence:</strong> {residenceCountry}
              </p>
              <p>
                <strong>Property:</strong> {property}
              </p>
              <p>
                <strong>Address:</strong> {address}
              </p>
            </div>
            <div>
              <p>
                <strong>Number of Rooms:</strong> {numberOfRooms}
              </p>
              <p>
                <strong>Number of Extra Beds:</strong> {numberOfExtraBeds}
              </p>
              <p>
                <strong>Number of Adults:</strong> {numberOfAdults}
              </p>
              <p>
                <strong>Number of Children:</strong> {numberOfChildren}
              </p>
              <p>
                <strong>Room Type:</strong> {roomType}
              </p>
              <p>
                <strong>Arrival:</strong> {arrival}
              </p>
              <p>
                <strong>Departure:</strong> {departure}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleSaveAsPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded my-3"
        >
          Save as PDF
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
            <label htmlFor="bookingId" className="text-lg font-bold">
              Booking ID
            </label>
            <input
              type="number"
              id="bookingId"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              placeholder="Enter Booking ID"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bookingRefNo" className="text-lg font-bold">
              Booking Reference No
            </label>
            <input
              type="number"
              id="bookingRefNo"
              value={bookingRefNo}
              onChange={(e) => setBookingRefNo(e.target.value)}
              placeholder="Enter Booking Reference No"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="client" className="text-lg font-bold">
              Client
            </label>
            <input
              type="text"
              id="client"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Enter Client"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="memberId" className="text-lg font-bold">
              Member ID
            </label>
            <input
              type="number"
              id="memberId"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="Enter Member ID"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="residenceCountry" className="text-lg font-bold">
              Country's of Residence
            </label>
            <input
              type="text"
              id="residenceCountry"
              value={residenceCountry}
              onChange={(e) => setResidenceCountry(e.target.value)}
              placeholder="Enter Country of Residence"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="property" className="text-lg font-bold">
              Property
            </label>
            <input
              type="text"
              id="property"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              placeholder="Enter Property"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="text-lg font-bold">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              rows={4}
            ></textarea>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label htmlFor="numberOfRooms" className="text-lg font-bold">
              Number of Rooms
            </label>
            <input
              type="number"
              id="numberOfRooms"
              value={numberOfRooms}
              onChange={(e) => setNumberOfRooms(e.target.value)}
              placeholder="Enter Number of Rooms"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfExtraBeds" className="text-lg font-bold">
              Number of Extra Beds
            </label>
            <input
              type="number"
              id="numberOfExtraBeds"
              value={numberOfExtraBeds}
              onChange={(e) => setNumberOfExtraBeds(e.target.value)}
              placeholder="Enter Number of Extra Beds"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfAdults" className="text-lg font-bold">
              Number of Adults
            </label>
            <input
              type="number"
              id="numberOfAdults"
              value={numberOfAdults}
              onChange={(e) => setNumberOfAdults(e.target.value)}
              placeholder="Enter Number of Adults"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfChildren" className="text-lg font-bold">
              Number of Children
            </label>
            <input
              type="number"
              id="numberOfChildren"
              value={numberOfChildren}
              onChange={(e) => setNumberOfChildren(e.target.value)}
              placeholder="Enter Number of Children"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="roomType" className="text-lg font-bold">
              Room Type
            </label>
            <input
              type="text"
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              placeholder="Enter Room Type"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="arrival" className="text-lg font-bold">
              Arrival
            </label>
            <div className="relative">
              <input
                type="date"
                id="arrival"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                placeholder="Select Arrival Date"
                className="border border-gray-300 rounded-md px-4 py-2 pr-10 w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="departure" className="text-lg font-bold">
              Departure
            </label>
            <div className="relative">
              <input
                type="date"
                id="departure"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                placeholder="Select Departure Date"
                className="border border-gray-300 rounded-md px-4 py-2 pr-10 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handlePreview}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Preview
      </button>
    </div>
  );
};

export default Booking;
