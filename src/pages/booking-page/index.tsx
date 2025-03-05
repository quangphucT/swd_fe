import { useState } from 'react';
import { Select, Card, Button } from 'antd';
import './index.scss';

const doctors = [
    { id: 1, name: 'Dr. Nguyễn Văn A' },
    { id: 2, name: 'Dr. Trần Thị B' },
    { id: 3, name: 'Dr. Lê Văn C' },
];

const availableSlots = {
    1: ['09:00 - 09:30', '10:00 - 10:30', '14:00 - 14:30'],
    2: ['08:30 - 09:00', '11:00 - 11:30', '15:00 - 15:30'],
    3: ['09:30 - 10:00', '13:00 - 13:30', '16:00 - 16:30'],
};

const BookingPage = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    return (
        <div className="booking-container">
            <h2>Đặt lịch khám</h2>
            <div className="doctor-selection">
                <Select
                    placeholder="Chọn bác sĩ"
                    style={{ width: 300 }}
                    onChange={value => {
                        setSelectedDoctor(value);
                        setSelectedSlot(null);
                    }}
                >
                    {doctors.map(doctor => (
                        <Select.Option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            {selectedDoctor && (
                <div className="slots-container">
                    <h3>Lịch trống:</h3>
                    <div className="slots">
                        {availableSlots[selectedDoctor].map(slot => (
                            <Card
                                key={slot}
                                className={`slot-card ${selectedSlot === slot ? 'selected' : ''}`}
                                onClick={() => setSelectedSlot(slot)}
                            >
                                {slot}
                            </Card>
                        ))}
                    </div>
                </div>
            )}
            {selectedSlot && (
                <Button type="primary" className="confirm-button">
                    Xác nhận lịch hẹn
                </Button>
            )}
        </div>
    );
};

export default BookingPage;