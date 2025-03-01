import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  FormHelperText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { store } from "../store";
import { each } from "lodash";
import { formatNumberCurrency } from "../shared";
import { useFormik } from "formik";
import { borderRadius } from "@mui/system";
import { orderSchema } from "../validations";
import { ListGroup } from "react-bootstrap";

const Checkout = ({ api }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedAddressId, setSelectedAddressId] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [position, setPosition] = useState([14.676, 121.043]); // Default to Manila
  const [summary, setSummary] = React.useState({ subTotal: 0, grandTotal: 0 });

  const { addresses, paymentMethods, cart } = store;

  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  function LocationMarker() {
    useMapEvents({
      dragend: (event) => {
        const { lat, lng } = event.target.getLatLng();
        setPosition([lat, lng]);
        setAddress(`Lat: ${lat}, Lng: ${lng}`); // Simulated address update
      },
    });
    return <Marker position={position} draggable icon={markerIcon} />;
  }

  const formik = useFormik({
    initialValues: { addressId: null, cartId: null, paymentMethodId: null },
    validationSchema: orderSchema,
    onSubmit: async (values) => {
      console.log("🚀 ~ Checkout ~ values:", values);
      const { cartId, addressId, paymentMethodId } = values;
      const dto = { cartId, addressId, paymentMethodId };
      api
        .createOrder(dto)
        .then(async (res) => {
          console.log("🚀 ~ api.createOrder ~ res:", res);
          await api.getCart().then((res) => (store.cart = res.data));
          navigate("/");
        })
        .catch((error) => {
          console.error("error", error);
        });
    },
  });

  React.useEffect(() => {
    console.log("useEffect", store.cart);
    if (store.cart.cartItems !== null) {
      console.log("cartItems", store.cart.cartItems);
      const subTotal = store.cart.cartItems.reduce(
        (total, val) => total + Number(val.product.price) * val.quantity,
        0
      );
      console.log("🚀 ~ React.useEffect ~ subTotal:", subTotal);
      const deliveryFee = 49;
      const grandTotal = deliveryFee + subTotal;
      setSummary({ subTotal, grandTotal });
    }
    formik.setFieldValue("cartId", cart.id);
  }, []);

  React.useEffect(() => {
    console.log("formik");
  }, [formik]);

  const selectAddress = (id) => {
    if (selectedAddressId === id) {
      setSelectedAddressId(0);
      formik.setFieldValue("addressId", id);
    } else {
      setSelectedAddressId(id);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      {/* Back Button */}
      <IconButton onClick={() => navigate("/menu")} sx={{ mb: 2 }}>
        <ArrowBackIcon /> Back
      </IconButton>

      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Contact Details
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <ListGroup>
            {addresses.map((address, index) => {
              return(<div key={index}>
                <Typography variant="subtitle1">{address.province}</Typography>
                <Typography variant="body1">{address.line1}</Typography>
                <Typography variant="body1">{address.line2}</Typography>
                <Typography variant="body1">
                  {address.cityMunicipality}
                </Typography>
                <Typography variant="body1">{address.zipCode}</Typography>
                <br />
                <Typography variant="body2">{address.recipientName}</Typography>
                <Typography variant="body2">{address.contactNumber}</Typography>
              </div>)
            })}
          </ListGroup>
          
        </Box>

        {/* Map Selection */}
        {/* <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>Select Delivery Location</Typography>
      <MapContainer center={position} zoom={13} style={{ height: 300, marginTop: 10 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
      <TextField fullWidth label="Address" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mt: 2 }} /> */}

        {/* Payment Method */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
          Payment Method
        </Typography>
        <Select
          name="paymentMethodId"
          error={
            formik.touched.paymentMethodId &&
            Boolean(formik.errors.paymentMethodId)
          }
          fullWidth
          value={paymentMethod}
          id="paymentMethodId"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ mt: 1 }}
        >
          {paymentMethods.map((pm) => {
            return (
              <MenuItem key={pm.id} value={pm.id}>
                {pm.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>Payment Method</FormHelperText>
        {/* {formik.touched.name && Boolean(formik.errors.name)  */}

        {/* Order Summary */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
          Order Summary
        </Typography>
        {cart.cartItems.map((item) => (
          <Box
            key={item.id}
            sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
          >
            <Typography>
              {item.quantity} x {item.product.name}
            </Typography>
            <Typography>
              {formatNumberCurrency(item.product.price * item.quantity)}
            </Typography>
          </Box>
        ))}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          Total: {formatNumberCurrency(summary.grandTotal)}
        </Typography>

        {/* Confirm Order */}
        <button type="submit">Place Order</button>
      </form>
    </Box>
  );
};

export default Checkout;
