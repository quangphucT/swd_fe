import { Col, Row } from "antd"
import './index.scss'
import Subcarousel from "../sub-carousel"

const Topbestselling = () => {
    return (
        <div className="main_wrapper_columns">
            <div className="top_text_bestSelling">
                <h1>Top những sản phẩm bán chạy nhất</h1>
            </div>
            <Row align={"middle"} gutter={10} className="wrapper_columns">
                <Col className="left_column" span={9}><Subcarousel /></Col>
                <Col className="middle" span={1}></Col>
                <Col className="right_column" span={14}>a</Col>
            </Row>
        </div>
    )
}

export default Topbestselling
