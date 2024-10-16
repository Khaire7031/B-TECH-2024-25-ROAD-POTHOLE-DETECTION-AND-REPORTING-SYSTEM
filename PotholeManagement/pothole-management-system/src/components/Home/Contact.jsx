import React from 'react';
import Footer from "../Home/Footer"

const teamMembers = [
    {
        name: "Sanket Mahajan",
        email: "sanket.22110881@viit.ac.in",
        rollNumber: "432032",
        prn: "22110881",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8p6eQtlLs9KGhijxmyfSklGIZZxJOw3fkJQ&s"
    },
    {
        name: "Pranav Khaire",
        email: "pranav.22110507@viit.ac.in",
        rollNumber: "432027",
        prn: "22110507",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s",
    },
    {
        name: "Sahil Pawar",
        email: "sahil.22110441@viit.ac.in",
        rollNumber: "432042",
        prn: "22110441",
        photo: "https://png.pngtree.com/png-clipart/20190516/original/pngtree-beard-man-icon-png-image_3732088.jpg",
    },
    {
        name: "Pushkar Pawar",
        email: "pushkar.22110369@viit.ac.in",
        rollNumber: "432041",
        prn: "22110369",
        photo: "https://cdn-icons-png.flaticon.com/512/4042/4042356.png",
    },
];

export default function Contact() {
    return (
        <div className="p-2 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            {/* Team Section */}
            <div className="w-full bg-white rounded-lg shadow-md p-8 mb-10">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Meet the Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member) => (
                        <div key={member.rollNumber} className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-full h-60 object-cover rounded-full mx-auto mb-3"
                            />
                            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-gray-600">{member.email}</p>
                            <p className="text-gray-600">Roll No: {member.rollNumber}</p>
                            <p className="text-gray-600">PRN: {member.prn}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Company Information Section */}
            <div className="w-full bg-white rounded-lg shadow-md">
                <Footer />
            </div>
        </div>
    );
}
