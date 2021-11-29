import { useState, useRef, useContext } from 'react';
import { Button, Modal, Col, Image, Row, Form } from 'react-bootstrap';
import AuthContext from '../../store/auth-context';

import Toasts from '../Common/Toasts';

import defaultImage from '../../assets/Image/default.png';
import axios from 'axios';

import classes from './ShopItem.module.css';

const ShopItem = (props) => {
  const authCtx = useContext(AuthContext);
  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const inputFile = useRef(null);
  const { data } = props;
  // state input file
  const [selectedFile, setSelectedFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [avatar, setAvatar] = useState('');

  // state for show notification
  const [isShowToasts, setIsShowToasts] = useState(false);

  // set message for notification
  const [message, setMessage] = useState({});

  // handler upload file
  const handleUploadFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleHideToast = () => {
    setIsShowToasts(false);
  };
  // handle add new Item
  const handleSubmit = (event) => {
    event.preventDefault();
    // get name item
    const enterName = nameInputRef.current.value;
    // get price item
    const enterPrice = priceInputRef.current.value;
    const formData = new FormData();
    formData.append('Name', enterName);
    formData.append('ShopId', authCtx.shop.shopId);
    formData.append('Price', enterPrice);
    formData.append('Image', avatar);

    // get value input
    const config = {
      method: 'POST',
      body: formData,
      headers: {
        accept: '*/*',
      },
    };
    const url = 'http://localhost:8080/api/Item/create';

    fetch(url, config)
      .then((res) => res.json())
      .then((data) => {
        // hidden modal
        props.onHide();
        // show notification
        setIsShowToasts(true);
        if (!data.status) {
          setMessage({
            isSuccess: true,
            message: `This ${data.name} add success!!!`,
          });
        } else {
          setMessage({
            isSuccess: false,
            message: data.title,
          });
        }
      });
  };

  // handler update Item
  const handleUpdateItem = (event, itemId) => {
    event.preventDefault();
    // get name item
    const enterName = nameInputRef.current.value;
    // get price item
    const enterPrice = priceInputRef.current.value;
    const formData = new FormData();
    formData.append('ShopId', authCtx.shop.shopId);
    formData.append('ItemId', itemId);
    formData.append('Name', enterName);
    formData.append('Price', enterPrice);
    formData.append('Image', avatar);
    // get value input
    const config = {
      method: 'PUT',
      url: '/api/Item',
      data: formData,
    };
    axios(config).then(({ data }) => {
      console.log(data);
    });
  };

  const changeAvatar = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };
  // update data
  if (data) {
    return (
      <>
        <Modal show={props.onAddItem} onHide={props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Add item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm='2'>
                  Name:
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='Input name'
                    required
                    ref={nameInputRef}
                    defaultValue={data.name}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm='2'>
                  Price:
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='number'
                    placeholder='0'
                    required
                    ref={priceInputRef}
                    defaultValue={data.price}
                    min='0'
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm='2'>
                  Image:
                </Form.Label>
                <Form.Control
                  type='file'
                  onChange={changeAvatar}
                  style={{ display: 'none' }}
                  ref={inputFile}
                />
                <div>
                  <Image
                    className={classes.avatar}
                    src={
                      data.image
                        ? `data:image/jpeg;base64,${data.image}`
                        : defaultImage
                    }
                    onClick={() => inputFile.current.click()}
                    thumbnail
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='primary'
              onClick={(event) => handleUpdateItem(event, data.itemId)}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  return (
    <>
      <Modal show={props.onAddItem} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add itemaa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm='2'>
                Name:
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='text'
                  placeholder='Input name'
                  required
                  ref={nameInputRef}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm='2'>
                Price:
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='number'
                  placeholder='0'
                  required
                  ref={priceInputRef}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm='2'>
                Image:
              </Form.Label>
              <Form.Control
                type='file'
                onChange={changeAvatar}
                style={{ display: 'none' }}
                ref={inputFile}
              />
              <div>
                <Image
                  className={classes.avatar}
                  src={imagePreviewUrl ? imagePreviewUrl : defaultImage}
                  onClick={() => inputFile.current.click()}
                  thumbnail
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='primary' onClick={handleSubmit}>
            Save Item
          </Button>
        </Modal.Footer>
      </Modal>
      {isShowToasts && (
        <Toasts message={message} onHideToast={handleHideToast} />
      )}
    </>
  );
};

export default ShopItem;
