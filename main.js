// 1. Job Data
// Array of objects

const jobs = [

    {
        id: 1,
        title: "Python Developer",
        company: "Tech Solutions",
        location: "Chennai",
        salary: "₹4 - ₹6 LPA",
        skills: "Python, Django, SQL"
    },

    {
        id: 2,
        title: "Frontend Developer",
        company: "Web Technologies",
        location: "Bangalore",
        salary: "₹3 - ₹5 LPA",
        skills: "HTML, CSS, JavaScript"
    },

    {
        id: 3,
        title: "Java Developer",
        company: "Software World",
        location: "Hyderabad",
        salary: "₹4 - ₹7 LPA",
        skills: "Java, Spring Boot, SQL"
    },

    {
        id: 4,
        title: "Data Analyst",
        company: "Analytics India",
        location: "Chennai",
        salary: "₹3 - ₹5 LPA",
        skills: "Python, Excel, SQL"
    }

];


// 2. Get HTML Elements

const jobContainer =
    document.getElementById("jobContainer");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const jobCount =
    document.getElementById("jobCount");

const modal =
    document.getElementById("applicationModal");

const closeModal =
    document.getElementById("closeModal");

const applicationForm =
    document.getElementById("applicationForm");

const applicationContainer =
    document.getElementById("applicationContainer");


// 3. Display Jobs

function displayJobs(jobList) {

    jobContainer.innerHTML = "";

    if (jobList.length === 0) {

        jobContainer.innerHTML =
            "<p>No jobs found.</p>";

        return;
    }


    jobList.forEach(function(job) {

        const card =
            document.createElement("div");

        card.className = "job-card";

        card.innerHTML = `

            <h3>${job.title}</h3>

            <p>
                <strong>Company:</strong>
                ${job.company}
            </p>

            <p>
                <strong>Location:</strong>
                ${job.location}
            </p>

            <p>
                <strong>Salary:</strong>
                ${job.salary}
            </p>

            <p>
                <strong>Skills:</strong>
                ${job.skills}
            </p>

            <button
                class="apply-btn"
                onclick="openApplication(${job.id})"
            >
                Apply Now
            </button>

        `;

        jobContainer.appendChild(card);

    });


    jobCount.textContent = jobList.length;
}


// 4. Initial Display

displayJobs(jobs);


// 5. Search Jobs

function searchJobs() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredJobs =
        jobs.filter(function(job) {

            return (

                job.title
                    .toLowerCase()
                    .includes(searchText)

                ||

                job.location
                    .toLowerCase()
                    .includes(searchText)

                ||

                job.skills
                    .toLowerCase()
                    .includes(searchText)

            );

        });


    displayJobs(filteredJobs);
}


// Search button

searchButton.addEventListener(
    "click",
    searchJobs
);


// Search while typing

searchInput.addEventListener(
    "input",
    searchJobs
);


// 6. Open Application Modal

let selectedJobId = null;


function openApplication(jobId) {

    selectedJobId = jobId;

    modal.style.display = "flex";
}


// 7. Close Modal

closeModal.addEventListener(
    "click",
    function() {

        modal.style.display = "none";

    }
);


// Close modal when clicking outside

window.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            modal.style.display = "none";

        }

    }
);


// 8. Application Form

applicationForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById("studentName").value;

        const email =
            document.getElementById("studentEmail").value;

        const skill =
            document.getElementById("studentSkill").value;


        const selectedJob =
            jobs.find(function(job) {

                return job.id === selectedJobId;

            });


        const application = {

            id: Date.now(),

            studentName: name,

            email: email,

            skill: skill,

            jobTitle: selectedJob.title,

            company: selectedJob.company

        };


        // Get old applications

        let applications =
            JSON.parse(
                localStorage.getItem("applications")
            ) || [];


        // Add new application

        applications.push(application);


        // Save applications

        localStorage.setItem(
            "applications",
            JSON.stringify(applications)
        );


        alert("Application submitted successfully!");


        // Close modal

        modal.style.display = "none";


        // Clear form

        applicationForm.reset();


        // Display applications

        displayApplications();

    }
);


// 9. Display Applications

function displayApplications() {

    let applications =
        JSON.parse(
            localStorage.getItem("applications")
        ) || [];


    applicationContainer.innerHTML = "";


    if (applications.length === 0) {

        applicationContainer.innerHTML =
            "<p>No applications yet.</p>";

        return;
    }


    applications.forEach(function(application) {

        const card =
            document.createElement("div");

        card.className =
            "application-card";


        card.innerHTML = `

            <h3>${application.jobTitle}</h3>

            <p>
                <strong>Company:</strong>
                ${application.company}
            </p>

            <p>
                <strong>Name:</strong>
                ${application.studentName}
            </p>

            <p>
                <strong>Email:</strong>
                ${application.email}
            </p>

            <p>
                <strong>Skill:</strong>
                ${application.skill}
            </p>

            <button
                class="remove-btn"
                onclick="removeApplication(${application.id})"
            >
                Remove
            </button>

        `;


        applicationContainer.appendChild(card);

    });

}


// 10. Remove Application

function removeApplication(applicationId) {

    let applications =
        JSON.parse(
            localStorage.getItem("applications")
        ) || [];


    applications =
        applications.filter(function(application) {

            return application.id !== applicationId;

        });


    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    displayApplications();
}


// 11. Load applications when page opens

displayApplications();