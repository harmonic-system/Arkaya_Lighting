import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useAdminContext } from "../../../context/admin-context";
import { useNavigate } from "react-router-dom";
import ActionLoading from "../../Loading/ActionLoading";

const AddAdminProduct = () => {
  const [productData, setProductData] = useState({
    productfile: null,
    productname: "",
    model:"",
    sku: "",
    IndoorOutdoor: "",
    price: "",
    productCategory: "",
    featured: false,
    des: {
      description: "",
    },
    keywords: [], // Add keywords state
  });

  const { isLoading, addProduct } = useAdminContext()
  const navigate = useNavigate()

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleUploadImage = (e) => {
    const productfile = e.target.files[0]
    transforFile(productfile)
  }

  const transforFile = (productfile) => {
    const reader = new FileReader()

    reader.readAsDataURL(productfile)
    reader.onloadend = () => {
      setProductData(prevState => ({
        ...prevState,
        productfile: reader.result
      }));
    }
  }

  const handleDeleteImage = () => {
    setProductData((prevState) => ({ ...prevState, productfile: null }))
  };

  const handleAddField = () => {
    setProductData((prev) => ({
      ...prev,
      des: { ...prev.des, [fieldName]: "" },
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) {
      toast.error("Keyword cannot be empty");
      return;
    }
    if (productData.keywords.includes(newKeyword.trim())) {
      toast.error("Keyword already exists");
      return;
    }
    setProductData((prev) => ({
      ...prev,
      keywords: [...prev.keywords, newKeyword.trim()],
    }));
    setNewKeyword("");
  };

  const handleDeleteKeyword = (index) => {
    const updatedKeywords = productData.keywords.filter((_, i) => i !== index);
    setProductData((prev) => ({
      ...prev,
      keywords: updatedKeywords,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addProduct(productData)
      navigate("/admin/products")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StyledWrapper>
      <section className="container upload-product-section">
        <div className="header-bar">
          <h2>Upload Product</h2>
        </div>
        <div className="contact-form">
          <form className="contact-inputs" onSubmit={handleSubmit}>

            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="productImage" className="upload-label">
                <div className="upload-content">
                  <FaCloudUploadAlt size={35} />
                  <p>Upload Image</p>
                </div>
                <input
                  id="productImage"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </label>
              <div className="uploaded-images">
                {productData.productfile && ( // Ensure productfile exists before rendering
                  <div className="image-thumbnail">
                    <img
                      src={productData.productfile}
                      alt="Product"
                      className="thumbnail-image"
                    />
                    <MdDelete
                      className="delete-icon"
                      onClick={handleDeleteImage}
                    />
                  </div>
                )}
              </div>
            </div>

            <input
              type="text"
              onChange={handleChange}
              value={productData.productname}
              name="productname"
              placeholder="Product Name"
              autoComplete="off"
              required
            />
            <input
              type="text"
              onChange={handleChange}
              value={productData.model}
              name="model"
              placeholder="Model Number"
              autoComplete="off"
              required
            />
            <input
              type="text"
              onChange={handleChange}
              value={productData.sku}
              name="sku"
              placeholder="SKU Number"
              autoComplete="off"
              required
            />

            <select
              onChange={handleChange}
              value={productData.IndoorOutdoor}
              name="IndoorOutdoor"
              required
            >
              <option value="" disabled>Click Here To Select Indoor/Outdoor</option>
              <option className='select--option' value="Indoor">Indoor</option>
              <option className='select--option' value="Outdoor">Outdoor</option>
            </select>

            <input
              type="text"
              onChange={handleChange}
              value={productData.price}
              name="price"
              placeholder="Product Price"
              autoComplete="off"
            />

            <select
              onChange={handleChange}
              value={productData.productCategory}
              name="productCategory"
              required
            >
              <option value="" disabled>Click Here To Select Product Category</option>
              <option className='select--option' value="floodlights">Flood Lights</option>
              <option className='select--option' value="undergroundlights">Underground Lights</option>
              <option className='select--option' value="underwaterlights">Underwater Lights</option>
              <option className='select--option' value="wallwashers">Wall Washers</option>
              <option className='select--option' value="treehangings">Tree Hangings Lights</option>
              <option className='select--option' value="mediapixels">Media Pixels</option>
              <option className='select--option' value="mhslamps">Moving Head Series Lamp</option>
              <option className='select--option' value="mhsleds">Moving Head Series Led</option>
              <option className='select--option' value="staticleds">Static Leds</option>
              <option className='select--option' value="effectlights">Effects Lights</option>
              <option className='select--option' value="strips">Strips</option>
              <option className='select--option' value="dotpixels">Dot Pixels</option>
              <option className='select--option' value="ledmatrixes">Led Matrix</option>
              <option className='select--option' value="chandeliers">Chandeliers</option>
              <option className='select--option' value="theaters">Theaters</option>
              <option className='select--option' value="studios">Studios</option>
              <option className='select--option' value="televisions">Televisions</option>
              <option className='select--option' value="indoors">Indoor</option>
              <option className='select--option' value="outdoors">Outdoor</option>
              <option className='select--option' value="ledcontrollers">LED Controllers</option>
              <option className='select--option' value="dmxcontrollers">DMX Controllers</option>
              <option className='select--option' value="signaldistributions">Signal Distribution</option>
              <option className='select--option' value="powersupplies">Power Supplies</option>
              <option className='select--option' value="decorderandamplifiers">Decorders And Amplifiers</option>
              <option className='select--option' value="processors">Processors</option>
              <option className='select--option' value="trusses">Trusses</option>
              <option className='select--option' value="clamps">Clamps</option>
              <option className='select--option' value="alluminiumprofiles">Alluminium Profile</option>
              <option className='select--option' value="siliconprofiles">Silicon Profile</option>
              <option className='select--option' value="stagelightinges">Stage Lighting</option>
              <option className='select--option' value="studiolightinges">Studio Lighting</option>
              <option className='select--option' value="connectors">Connectors</option>
            </select>

            <div className="feature-container">
              <label htmlFor="featureProduct">Featured Product</label>

              <input
                type="checkbox"
                id='featureProduct'
                onChange={handleChange}
                value={productData.featured}
                name="featured"
                placeholder="Featured Product"
                autoComplete="off"
              />
            </div>

            {/* Add keywords */}
            <div className="keywords-section">
              <h3>Add Keywords</h3>
              <div className="add-keyword">
                <input
                  type="text"
                  value={newKeyword}
                  placeholder="Enter keyword"
                  onChange={(e) => setNewKeyword(e.target.value)}
                />
                <button
                  type="button"
                  className="add-keyword-button"
                  onClick={handleAddKeyword}
                >
                  Add Keyword
                </button>
              </div>
              <div className="keywords-list">
                {productData.keywords.map((keyword, index) => (
                  <div key={index} className="keyword-item">
                    <span>{keyword}</span>
                    <MdDelete
                      className="keyword-delete-icon"
                      onClick={() => handleDeleteKeyword(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Add Fields */}
            {Object.keys(productData?.des).map((key, index) => (
              <div key={index} className="form-group">
                <label className='description-key'>{key}</label>
                <input
                  id={key}
                  type="text"
                  // placeholder={key}
                  value={productData?.des[key]}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      des: {
                        ...prev.des,
                        [key]: e.target.value,
                      },
                    }))
                  }
                />
                <MdDelete
                  className="delete-field-icon"
                  onClick={() => {
                    const updatedDescription = { ...productData.des };
                    delete updatedDescription[key];
                    setProductData((prev) => ({
                      ...prev,
                      des: updatedDescription,
                    }));
                  }}
                />
              </div>
            ))}
            {openAddField && (
              <div className="add-field-popup">
                <input
                  type="text"
                  placeholder="Enter field name"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                />
                <button type="button" className="add-button" onClick={handleAddField}>Add Field</button>
                <button type="button" onClick={() => setOpenAddField(false)} className="cancel-button"><IoClose /></button>
              </div>
            )}
            <button type="button" onClick={() => setOpenAddField(true)} className="add-field-button">Add Fields</button>
            <button type="submit" className="submit-button">{isLoading ? <ActionLoading /> : "Add Product"}</button>
          </form>
        </div>
      </section>
    </StyledWrapper>
  );
};

export default AddAdminProduct;

const StyledWrapper = styled.div`
  .upload-product-section {
    padding: 20px;
    background-color: #f9f9f9;
  }
    
  .header-bar {
    padding: 10px;
    margin-bottom: 30px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    position: relative;

    label {
      font-size:1.2rem
    }

    .description-key {
      text-align: left;
      margin-bottom:20px;
    }
  }

  .upload-label {
    padding: 20px;
    border: 2px dashed #ccc;
    text-align: center;
    cursor: pointer;
  }

  .uploaded-images {
    margin-top: 30px;
    display: flex;
    gap: 10px;
  }

  .image-thumbnail {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }

  .thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .delete-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    color: red;
    cursor: pointer;
  }

  .add-field-button,
  .submit-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
  }

  .add-field-popup {
    display: flex;
    gap: 10px;
    margin: 15px 0;

    .add-button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #007bff;
      color: #fff;
    }
  }

  .cancel-button {
    padding: 10px 20px;
    background-color: #ccc;
    color: #000;
    border:none;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size:2rem;
    }
  }

  .delete-field-icon {
    margin-left: 10px;
    color: red;
    cursor: pointer;
    font-size: 1.5rem;
    position: absolute;
    top:0px;
    right: 20px;
  }

  .keywords-section {

    margin-bottom: 2rem;

    h3 {
      margin-bottom: 1rem;
    }

    .add-keyword {
      display: flex;
      gap: 1rem;

      input {
        flex: 1;
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      .add-keyword-button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .keywords-list {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      .keyword-item {
        background-color: #f1f1f1;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        display: flex;
        width: auto;
        align-items: center;
        justify-content: space-between;
        gap: 2rem !important;
        position: relative;

        span {
          font-size:1.2rem;
        }

        .keyword-delete-icon {
          color: red;
          cursor: pointer;
        }
      }
    }
  }

  .contact-inputs {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    input {
      border-radius: 1rem;
    }

    select{
      border-radius: 0.5rem;
      // border:1px solid #FFD75E;
      border:none;
      outline:none;
      padding: 1.6rem 2.4rem;
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
        
      .select--option {
        padding:1rem;
      }
    }

    .feature-container {
      display: flex;
      gap: 3rem;
      justify-content:start;
      align-items: center;
      padding: 1.6rem 2.4rem;
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      border-radius: 1rem;

      label {
        // font-weight: bold;
        font-size: 1.2rem;
      }
    }

    textarea {
      border-radius: 1rem;
      resize: none;
    }

    Button {
      // max-width: 50rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) => theme.colors.btn};
        color: ${({ theme }) => theme.colors.btn};
        transform: scale(0.9);
      }
    }
  }
`;

