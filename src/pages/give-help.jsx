import axios from 'axios';
import { useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
export default function SafeHavenForm() {
    const [formData, setFormData] = useState({
        businessName: '',
        type: '',
        address: '',
        contactEmail: '',
        contactPhone: '',
        additionalInfo: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const webhookURL = proceses.env.DISCORD;
            await axios.post(webhookURL, { content: JSON.stringify(formData) });
            alert('Form submitted successfully!');
        } catch (error) {
            alert('Error submitting the form. Please try again.');
        }
    };

    return (
        <>
        <Navigation/>

        <form onSubmit={handleSubmit} className="py-8 px-36 space-y-8">
            <div className="space-y-6">
                <h2 className="text-4xl text-center font-semibold text-gray-900 py-2">Provide a Safe Haven</h2>
                <p className="text-sm leading-6 text-gray-600">Thank you for offering your establishment as a safe place in this unfortunate war. Please provide the details below:</p>
                
                <div>
                    <label htmlFor="businessName" className="block text-sm font-medium leading-6 text-gray-900">Business Name</label>
                    <input 
                        type="text" 
                        id="businessName" 
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                </div>

                <div>
                    <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Type of Establishment</label>
                    <select 
                        id="type" 
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="restaurant">Restaurant</option>
                        <option value="gas_station">Gas Station</option>
                        <option value="hotel">Hotel</option>
                        {/* Add other types as needed */}
                    </select>
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                    <input 
                        type="text" 
                        id="address" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                </div>

                <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium leading-6 text-gray-900">Contact Email</label>
                    <input 
                        type="email" 
                        id="contactEmail" 
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                </div>

                <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium leading-6 text-gray-900">Contact Phone</label>
                    <input 
                        type="tel" 
                        id="contactPhone" 
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                </div>

                <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium leading-6 text-gray-900">Additional Information</label>
                    <textarea 
                        id="additionalInfo" 
                        name="additionalInfo"
                        rows={3}
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-indigo-600 px-4 py-2 rounded-md text-white hover:bg-indigo-500 transition duration-300 ease-in-out">Submit</button>
                </div>
            </div>
        </form>
        <Footer />
        </>
    );
}
