const API_URL = "/api";
let currentRole = "admin";
const userId = 1;

// Set role (Admin / User)
function setRole() {
  currentRole = document.getElementById("role").value;

  document.getElementById("adminSection").classList.toggle(
    "hidden",
    currentRole !== "admin"
  );

  showMessage(`Logged in as ${currentRole.toUpperCase()}`);
  loadBooks();
}

// Load books
async function loadBooks() {
  const res = await fetch(`${API_URL}/books`);
  const books = await res.json();

  const table = document.getElementById("bookList");
  table.innerHTML = "";

  books.forEach(book => {
    let action = "-";

    if (currentRole === "user") {
      action = `<button class="secondary" onclick="borrowBook(${book.id})">
                  Borrow
                </button>`;
    }

    if (currentRole === "admin") {
      action = `
        <button class="danger" onclick="deleteBook(${book.id})">
          Delete
        </button>
      `;
    }

    table.innerHTML += `
      <tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.stock}</td>
        <td>${action}</td>
      </tr>
    `;
  });
}

// Add book (Admin)
async function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const stock = document.getElementById("stock").value;

  await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-role": "admin"
    },
    body: JSON.stringify({ title, author, stock })
  });

  showMessage("Book successfully added");
  loadBooks();
}

// Borrow book (User)
async function borrowBook(bookId) {
  const latitude = -6.2088;
  const longitude = 106.8456;

  const res = await fetch(`${API_URL}/borrow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-role": "user",
      "x-user-id": userId
    },
    body: JSON.stringify({
      bookId,
      latitude,
      longitude
    })
  });

  const data = await res.json();

  showMessage(
    `Book borrowed successfully. Location recorded at latitude ${latitude}, longitude ${longitude}.`
  );

  loadBooks();
}

// Delete book (Admin)
async function deleteBook(bookId) {
  const confirmDelete = confirm("Are you sure you want to delete this book?");
  if (!confirmDelete) return;

  await fetch(`${API_URL}/books/${bookId}`, {
    method: "DELETE",
    headers: {
      "x-user-role": "admin"
    }
  });

  showMessage("Book successfully deleted");
  loadBooks();
}

// Show message
function showMessage(text) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.classList.remove("hidden");

  setTimeout(() => {
    msg.classList.add("hidden");
  }, 4000);
}

// Initial load
loadBooks();
