import { useState , useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const totalTables = 5;
  const [tableNo, setTableNo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [filterDate, setFilterDate] = useState("");

const totalRevenue =
  bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length * 500;

  const today = new Date().toISOString().split("T")[0];

const todayBookings = bookings.filter(
  (booking) => booking.date === today
).length;

const table1Count = bookings.filter(
  (booking) => booking.tableNo === "Table 1"
).length;

const table2Count = bookings.filter(
  (booking) => booking.tableNo === "Table 2"
).length;

const table3Count = bookings.filter(
  (booking) => booking.tableNo === "Table 3"
).length;

const table4Count = bookings.filter(
  (booking) => booking.tableNo === "Table 4"
).length;

const table5Count = bookings.filter(
  (booking) => booking.tableNo === "Table 5"
).length;

  useEffect(() => {
  fetchBookings();
}, []);

const fetchBookings = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/bookings"
    );

    setBookings(response.data);
  } catch (error) {
    console.log(error);
  }
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(bookings);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Bookings"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(data, "Bookings.xlsx");
};

  return (
    
    <div 
     style={{
    width: "100%",
    overflowX: "hidden",
  }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#9b8888",
          color: "white",
          padding: "20px 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Foodie Restaurant</h2>

        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "25px",
            fontSize: "20px",
          }}
        >
          <li>Home</li>
          <li>Menu</li>
          <li>Book Table</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          height: "90vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: window.innerWidth < 768 ? "40px" : "70px",
            color: "white",
            textShadow: "2px 2px 10px black",
          }}
        >
          Welcome To Foodie Restaurant
        </h1>

        <p
          style={{
            fontSize: window.innerWidth < 768 ? "20px" : "30px",
            color: "white",
            textShadow: "2px 2px 10px black",
            marginTop: "15px",
          }}
        >
          Delicious Food, Great Experience
        </p>

        <button
          style={{
            padding: "15px 30px",
            border: "none",
            backgroundColor: "#f39c12",
            color: "white",
            fontSize: "20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Book a Table
        </button>
      </section>

      {/* Menu Section */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
          backgroundColor: "#f8f8f8",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>Our Special Menu</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Pizza */}
          <div
            style={{
              width: "300px",
              backgroundColor: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0px 0px 10px lightgray",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
              alt="Pizza"
              style={{
                width: "90%",
                maxWidth: "300px",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h2>🍕 Pizza</h2>
              <p>Cheese Burst Pizza</p>
              <h3>₹299</h3>
            </div>
          </div>

          {/* Burger */}
          <div
            style={{
              width: "300px",
              backgroundColor: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0px 0px 10px lightgray",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
              alt="Burger"
              style={{
                width: "90%",
                maxWidth: "300px",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h2>🍔 Burger</h2>
              <p>Veg Cheese Burger</p>
              <h3>₹149</h3>
            </div>
          </div>

          {/* Cold Drink */}
          <div
            style={{
              width: "300px",
              backgroundColor: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0px 0px 10px lightgray",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800"
              alt="Drink"
              style={{
                width: "90%",
                maxWidth: "300px",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h2>🥤 Cold Drink</h2>
              <p>Fresh & Chilled</p>
              <h3>₹49</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1 style={{ fontSize: "60px", marginBottom: "30px" }}>
          Book Your Table
        </h1>

        <div
          style={{
            maxWidth: "600px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "15px", fontSize: "18px" }}
          />

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setMobile(value);
              }
            }}
            style={{ padding: "15px", fontSize: "18px" }}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: "15px", fontSize: "18px" }}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ padding: "15px", fontSize: "18px" }}
          />
<select
  value={tableNo}
  onChange={(e) => setTableNo(e.target.value)}
  style={{
    padding: "15px",
    fontSize: "18px",
  }}
>
  <option value="">Select Table</option>
  <option value="Table 1">Table 1</option>
  <option value="Table 2">Table 2</option>
  <option value="Table 3">Table 3</option>
  <option value="Table 4">Table 4</option>
  <option value="Table 5">Table 5</option>
</select>
          <button
           onClick={async () => {console.log(name, mobile, date, time, tableNo); 

  if (!name || !mobile || !date || !time || !tableNo) {
    alert("Please fill all details");
    return;
  }

  if (mobile.length !== 10) {
    alert("Enter valid 10 digit mobile number");
    return;
  }
if (mobile.length !== 10) {
  alert("Enter valid 10 digit mobile number");
  return;
}

const tableAlreadyBooked = bookings.find(
  (booking) =>
    booking.tableNo === tableNo &&
    booking.date === date &&
    booking.time === time
);

if (tableAlreadyBooked) {
  alert("This Table is already booked for this time!");
  return;
}
try {
  if (isEditing) {
    await axios.put(
      `http://localhost:5000/booking/${editingId}`,
      {
        name,
        mobile,
        date,
        time,
        tableNo,
      }
    );

    alert("Booking Updated Successfully");

    setIsEditing(false);
    setEditingId(null);
  } else {
    await axios.post(
      "http://localhost:5000/booking",
      {
        name,
        mobile,
        date,
        time,
        tableNo,
      }
    );

    alert("Booking Successful");
  }

  setName("");
  setMobile("");
  setDate("");
  setTime("");
  setTableNo("");

  fetchBookings();

} catch (error) {
  console.log(error);
  alert("Server Error");
}
}}
          >
            {isEditing ? "Update Booking" : "Book Now"}
              
          </button>
          
        </div>
      </section>
<section
  style={{
    padding: "40px",
    textAlign: "center",
  }}
>
  <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      minWidth: "200px",
    }}
  >
    <h2>{bookings.length}</h2>
    <p>Total Bookings</p>
  </div>

  <div
    style={{
      backgroundColor: "#2196F3",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      minWidth: "200px",
    }}
  >
    <h2>
      {
        bookings.filter(
          (booking) => booking.status === "Confirmed"
        ).length
      }
    </h2>
    <p>Confirmed Bookings</p>
  </div>

  <div
    style={{
      backgroundColor: "#FF9800",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      minWidth: "200px",
    }}
  >
    <h2>
      {
        bookings.filter(
          (booking) =>
            booking.status !== "Confirmed"
        ).length
      }
    </h2>
    <p>Pending Bookings</p>
  </div>

<div
  style={{
    backgroundColor: "purple",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "200px",
  }}
>
  <h2>₹{totalRevenue}</h2>
  <p>Total Revenue</p>
</div>
<div
  style={{
    backgroundColor: "#E91E63",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "200px",
  }}
>
  <h2>{todayBookings}</h2>
  <p>Today's Bookings</p>
</div>
<div
  style={{
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px lightgray",
  }}
>
  <h2>Table Statistics</h2>

  <p>🍽️ Table 1 : {table1Count}</p>
  <p>🍽️ Table 2 : {table2Count}</p>
  <p>🍽️ Table 3 : {table3Count}</p>
  <p>🍽️ Table 4 : {table4Count}</p>
  <p>🍽️ Table 5 : {table5Count}</p>
</div>
</div>
<button
  onClick={exportToExcel}
  style={{
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "20px",
  }}
>
  📊 Export Bookings to Excel
</button>
  <h1>Booking History</h1>
  <h3>Total Bookings: {bookings.length}</h3>
  <h3>Available Tables: {totalTables - bookings.length}</h3>

  <input
  type="text"
  placeholder="Search by Name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    marginBottom: "20px",
    fontSize: "16px",
  }}
/>
<input
  type="date"
  value={filterDate}
  onChange={(e) => setFilterDate(e.target.value)}
  style={{
    padding: "10px",
    margin: "10px",
    fontSize: "16px",
  }}
/>
{bookings
  .filter((booking) =>
    booking.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((booking) =>
    filterDate ? booking.date === filterDate : true
  )
  .map((booking, index) => (
    <div
      key={booking._id}
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px auto",
        maxWidth: "600px",
        borderRadius: "10px",
      }}
    >
      <h3>Name: {booking.name}</h3>
      <p>Mobile: {booking.mobile}</p>
      <p>Date: {booking.date}</p>
      <p>Time: {booking.time}</p>
      <p>Table: {booking.tableNo}</p>
      <p
  style={{
    color:
      booking.status === "Confirmed"
        ? "green"
        : "orange",
    fontWeight: "bold",
  }}
>
  Status: {booking.status}
</p>
      

      <button
 onClick={async () => {
  try {
    await axios.delete(
      `http://localhost:5000/booking/${booking._id}`
    );

    fetchBookings();

    alert("Booking Deleted Successfully");
  } catch (error) {
    console.log(error);
    alert("Delete Failed");
  }
}}
>
  Delete
</button>
<button
  onClick={async () => {
    try {
      await axios.put(
        `http://localhost:5000/booking/status/${booking._id}`
      );

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  }}
>
  Confirm Booking
</button>
<button
  onClick={() => {
    setName(booking.name);
    setMobile(booking.mobile);
    setDate(booking.date);
    setTime(booking.time);
    setTableNo(booking.tableNo);

    setEditingId(booking._id);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  style={{
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  }}
>
  Edit
</button>
      
    </div>
  ))}
 
</section>

<section
  style={{
    padding: "60px 20px",
    backgroundColor: "#f8f8f8",
    textAlign: "center",
  }}
>
  <h1>Contact Us</h1>

  <div
    style={{
      maxWidth: "500px",
      margin: "30px auto",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    }}
  >
    <input
      type="text"
      placeholder="Your Name"
      style={{
        padding: "15px",
        fontSize: "16px",
      }}
    />

    <input
      type="email"
      placeholder="Your Email"
      style={{
        padding: "15px",
        fontSize: "16px",
      }}
    />

    <textarea
      placeholder="Your Message"
      rows="5"
      style={{
        padding: "15px",
        fontSize: "16px",
      }}
    ></textarea>

    <button
      style={{
        padding: "15px",
        backgroundColor: "#f39c12",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "18px",
      }}
    >
      Send Message
    </button>
  </div>
</section>

      {/* Footer */}
     <footer
  style={{
    backgroundColor: "#222",
    color: "white",
    textAlign: "center",
    padding: "30px",
  }}
>
  <h2>Foodie Restaurant</h2>

  <p>📍 Surat, Gujarat</p>

  <p>📞 +91 9876543210</p>

  <p>📧 foodie@gmail.com</p>

  <p style={{ marginTop: "15px" }}>
    © 2026 Foodie Restaurant. All Rights Reserved.
  </p>
</footer>
    </div>
  );
}

export default App;