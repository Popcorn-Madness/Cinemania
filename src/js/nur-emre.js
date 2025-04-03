// Axios'u import etme (npm ile kurduysanız)
import axios from "axios";

// GET isteği yapma
axios
  .get("https://api.example.com/data")
  .then((response) => {
    console.log("Veri:", response.data);
  })
  .catch((error) => {
    console.error("Hata:", error);
  });
