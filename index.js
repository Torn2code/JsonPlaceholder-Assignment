let tbody = document.getElementById("tbody");

let userData = []; 

// Open the edit modal
function openEditModal(id) {
  const editModal = document.getElementById("editModal");
  const editNameInput = document.getElementById("editName");
  const editBtn = document.getElementById("editBtn");

   // Find the user data by id
   const user = userData.find(data => data.id === id);

   // Populate the input field with the current name
   editNameInput.value = user.name;
 
   // Show the modal
   editModal.style.display = "block";
 
   // Update the user's name when the save button is clicked
   editBtn.addEventListener("click", () => {
     const newName = editNameInput.value;
 
     // Update the user's name in the userData array
     user.name = newName;
 
     // Close the modal
     editModal.style.display = "none";
 
     // Re-render the table with the updated data
     filterAndDisplayData();
   });

   

    // Close the modal when the 'x' button is clicked
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  // Close the modal when clicking outside the modal
  window.addEventListener("click", (event) => {
    if (event.target === editModal) {
      editModal.style.display = "none";
    }
  });
}

// Add a function to delete an employee
function deleteEmployee(id) {
  // Find the user index by id
  const userIndex = userData.findIndex(data => data.id === id);

  // Remove the user from the userData array
  userData.splice(userIndex, 1);

  // Re-render the table with the updated data
  filterAndDisplayData();
}

// fetch 
fetch(" http://localhost:3000/user")
  .then((res) => res.json())
  .then((json) => {
    const userData = json;
    let selectedTab = "All"; // show all data employee

    // Filter and display employee based on the selected tab
    function filterAndDisplayData() {
      tbody.innerHTML = ""; // clear current table

      const filteredData = userData.filter((data) => {
        if (selectedTab === "All") {
          // Show all data
          return true;
        } else if (selectedTab === "Employee") {
          // Show employees (exclude Owner)
          return data.role !== "Owner";
        } else if (selectedTab === "Active") {
          // Show active employees
          return data.status === "Active";
        } else {
          // Show employee based on other tabs
          return data.role === selectedTab;
        }
      });

      // Append the filtered data to the table
      filteredData.forEach((data) => {
        tbody.appendChild(td_fun(data));
      });
    }

    // Add click event listeners to the tab elements
    const tabElements = document.querySelectorAll(".tab");
    tabElements.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Get the selected tab text
        selectedTab = tab.textContent.trim();

        // Remove the "active" class from all tabs
        tabElements.forEach((t) => t.classList.remove("active"));

        // Add the "active" class to the selected tab
        tab.classList.add("active");

        // Filter and display employee based on the selected tab
        filterAndDisplayData();
      });
    });

    // Display all employee (all data)
    filterAndDisplayData();
  });

// create td
function td_fun({ profile, name, email, status, role }) {
  let td = document.createElement("tr");
  td.innerHTML = `
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10">
          <img src="${profile}" class="h-10 w-10 rounded-full">
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            ${name}
          </div>
          <div class="text-sm text-gray-500">
            ${email}
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        ${status}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        <span class="text-sm text-gray-500">
          ${role}
        </span>
      </span>
    </td>
  `;
  return td;
}
