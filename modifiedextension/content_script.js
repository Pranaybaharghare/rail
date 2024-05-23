// Mock data for stationList if required
const stationList = []; // Populate this list as needed

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fillIRCTCForm") {
        fillIRCTCForm(request.data);
    } else if (request.action === "startBooking") {
        startBooking();
    }
});

function fillIRCTCForm(data) {
    try {
        document.querySelector("#usernameId")?.value = data.irctc_credentials.userName || '';
        document.querySelector("input[type=password]")?.value = data.irctc_credentials.password || '';

        document.querySelector("#jpform\\:fromStation")?.value = data.journey_details.from_station || '';
        document.querySelector("#jpform\\:toStation")?.value = data.journey_details.to_station || '';
        document.querySelector("#jpform\\:journeyDateInputDate")?.value = data.journey_details.date || '';
        document.querySelector("#jpform\\:classType")?.value = data.journey_details.journey_class || '';
        document.querySelector("#jpform\\:quota")?.value = data.journey_details.quota || '';

        data.passenger_details.forEach((passenger, index) => {
            document.querySelector(`#addPassengerForm\\:psdetail\\:${index}\\:psgnName`)?.value = passenger.name || '';
            document.querySelector(`#addPassengerForm\\:psdetail\\:${index}\\:psgnAge`)?.value = passenger.age || '';
            document.querySelector(`#addPassengerForm\\:psdetail\\:${index}\\:psgnGender`)?.value = passenger.gender || '';
            document.querySelector(`#addPassengerForm\\:psdetail\\:${index}\\:berthChoice`)?.value = passenger.berth || '';
            document.querySelector(`#addPassengerForm\\:psdetail\\:${index}\\:nationality`)?.value = passenger.nationality || '';
        });

        data.infant_details.forEach((infant, index) => {
            document.querySelector(`#addPassengerForm\\:childPassenger\\:${index}\\:childName`)?.value = infant.name || '';
            document.querySelector(`#addPassengerForm\\:childPassenger\\:${index}\\:childAge`)?.value = infant.age || '';
            document.querySelector(`#addPassengerForm\\:childPassenger\\:${index}\\:childGender`)?.value = infant.gender || '';
        });

        document.querySelector("#userProfile\\:mobileNumber")?.value = data.contact_details.mobileNumber || '';
        document.querySelector("#userProfile\\:email")?.value = data.contact_details.email || '';

        if (data.gst_details.gstinNumber) {
            document.querySelector("#gstinDetails\\:gstin")?.value = data.gst_details.gstinNumber || '';
            document.querySelector("#gstinDetails\\:gstinName")?.value = data.gst_details.gstinName || '';
            document.querySelector("#gstinDetails\\:gstinAddress")?.value = data.gst_details.gstinAddress || '';
        }

        document.querySelector("#autoUpgradation")?.checked = data.other_preferences.autoUpgradation || false;
        document.querySelector("#confirmberths")?.checked = data.other_preferences.confirmberths || false;
        document.querySelector("#reservationChoice")?.value = data.other_preferences.reservationChoice || '';
        document.querySelector("#coachId")?.value = data.other_preferences.coachId || '';

        document.querySelector("#travelInsuranceOpted")?.checked = data.travel_preferences.travelInsuranceOpted || false;

        document.querySelector(`#paymentType[value='${data.payment_preferences.paymentType}']`)?.checked = true;

        console.log("Form filled with data: ", data);
    } catch (error) {
        console.error("Error filling IRCTC form: ", error);
    }
}

function startBooking() {
    document.querySelector("#jpform\\:submit")?.click();
}

setTimeout(() => {
    chrome.runtime.sendMessage({ action: "contentScriptLoaded" }, response => {
        if (response && response.action === "fillIRCTCForm") {
            fillIRCTCForm(response.data);
        }
    });
}, 3000);
