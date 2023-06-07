import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Button, Modal } from "antd";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:8000/api/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);

  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  }

  // Confirmation Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = async() => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/available/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        }) 
      );
      setIsModalVisible(true);
    } catch (err) {}
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  // Reservation Details Modal
  const [reservationDetailsVisible, setReservationDetailsVisible] = useState(false);

  const handleOkReservationDetails = () => {
    setReservationDetailsVisible(false);
    navigate("/");
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">₹{item.price}/-</div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <Checkbox
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    >
                      {roomNumber.number}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <Button onClick={showModal} className="rButton" type="primary">
          Reserve Now!
        </Button>

        {/* Confirmation Modal */}
        <Modal
          title="Confirmation"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={() => {
            setIsModalVisible(false);
            setReservationDetailsVisible(true);
          }}
        >
          <p>Are you sure you want to proceed with the reservation?</p>
        </Modal>

        {/* Reservation Details Modal */}
        <Modal
          title="Reservation Details"
          visible={reservationDetailsVisible}
          onOk={handleOkReservationDetails}
          onCancel={handleOkReservationDetails}
        >
          <p>Reservation Details:</p>
          {selectedRooms.map((roomId) => {
    const room = data.find((item) => item.roomNumbers.some((room) => room._id === roomId));
    return (
      <div key={roomId}>
        <p>Room Title: {room?.title}</p>
        <p>Room Description: {room?.desc}</p>
              {/* Add more reservation details as needed */}
              </div>
    );
  })}
</Modal>
      </div>
    </div>
  );
};

export default Reserve;