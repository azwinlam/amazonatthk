import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [index, setIndex] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setWeight(product.weight);
    setDescription(product.description);
    setImage(product.image);
    setImage2(product.image2);
    setImage3(product.image3);
    setImage4(product.image4);
    setImage5(product.image5);
    setIndex(product.index);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        weight,
        image,
        image2,
        image3,
        image4,
        image5,
        index,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  // // const uploadFileHandler = (e) => {
  // //   const file = e.target.files[0];
  // //   const bodyFormData = new FormData();
  // //   bodyFormData.append('image', file);
  // //   setUploading(true);
  // //   axios
  // //     .post('/api/uploads', bodyFormData, {
  // //       headers: {
  // //         'Content-Type': 'multipart/form-data',
  // //       },
  // //     })
  // //     .then((response) => {
  // //       setImage(response.data);
  // //       setUploading(false);
  // //     })
  // //     .catch((err) => {
  // //       console.log(err);
  // //       setUploading(false);
  // //     });
  // };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={weight}
                  id="weight"
                  required
                  onChange={(e) => setWeight(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  required
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <label htmlFor="image2">Image2</label>
                <input
                  type="text"
                  name="image2"
                  value={image2}
                  id="image2"
                  onChange={(e) => setImage2(e.target.value)}
                ></input>
                <label htmlFor="image3">Image3</label>
                <input
                  type="text"
                  name="image3"
                  value={image3}
                  id="image3"
                  onChange={(e) => setImage3(e.target.value)}
                ></input>
                <label htmlFor="image4">Image4</label>
                <input
                  type="text"
                  name="image4"
                  value={image4}
                  id="image4"
                  onChange={(e) => setImage4(e.target.value)}
                ></input>
                <label htmlFor="image5">Image5</label>
                <input
                  type="text"
                  name="image5"
                  value={image5}
                  id="image5"
                  onChange={(e) => setImage5(e.target.value)}
                ></input>
                {/* <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>} */}
              </li>
              <li>
                <label htmlFor="index">Index</label>
                <input
                  type="text"
                  name="index"
                  value={index}
                  id="index"
                  onChange={(e) => setIndex(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  required
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  required
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Category</label>
                <select
                          name="category"
                          id="category"
                          value={category}
                          required
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="Montessori">Montessori</option>
                          <option value="Pretend Play">Pretend Play</option>
                          <option value="Learning and Education">Learning and Education</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Play Vehicles">Play Vehicles</option>
                          <option value="Books">Books</option>
                          <option value="Other">Other</option>
                        </select>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Weight</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id.slice(20,24)}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.weight}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;
