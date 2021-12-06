import React, { useEffect, useState } from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@material-ui/core";
import "./css/product.css"
import { Card, Row, Col, Container } from "react-bootstrap";
import NavigationLoggedIn from './Navigation_logged_in';
import {useSelector} from "react-redux";

const Product = () => {
    var userID;

    const account = useSelector((state) => state.auth.account);
    if (account){
         userID= account.id;
    }
    
    console.log(userID)

    const [propertyData, setPropertyData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.limehome.com/properties/v1/public/properties')
            const propertyData_received = await response.json()
            setPropertyData(propertyData_received.payload)
        }
        fetchData()
    }, [])

    const handleFavourite = () => {

    };

    const capitalizeName = (str) => {
        const arr = str.split(" ");
        //loop through each element of the array and capitalize the first letter.
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }

        //Join all the elements of the array back into a string 
        //using a blankspace as a separator 
        const str2 = arr.join(" ");
        return str2;
    }




    return (
        <>
            <div className="main-container">
                <NavigationLoggedIn />
                <div className="container-product">
                    <Container>
                        <Row >
                            {propertyData.map((propertyData, k) => (
                                <Col key={k} xs={12} md={4} lg={3}>
                                    <Card className="property-card">
                                        <Card.Img src={propertyData.images[0].url} />
                                        <Card.Body>
                                            <div className="card-lower">
                                                <div className="property-name">
                                                    <Card.Title>{capitalizeName(propertyData.name)}</Card.Title>
                                                </div>
                                                <div className="fav-icon">
                                                    <IconButton onClick={handleFavourite}>
                                                        <FavoriteIcon style={{color: "red"}}  />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}


export default Product;