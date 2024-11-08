import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../styles/Button';
import { useAuthContext } from '../../../context/auth-context';
import LoadingPage from '../../Loading/Loading';
import ActionLoading from '../../Loading/ActionLoading';
import { useAdminContext } from '../../../context/admin-context';

const EditAdminProduct = () => {
  const { isLoading, singleProduct, getSingalProduct, updateProduct } = useAdminContext();
  const navigate = useNavigate()
  const { token } = useAuthContext();
  const { id } = useParams();  

  const [productData, setProductData] = useState({
    productfile: null,
    productname: "",
    sku: "",
    IndoorOutdoor: "",
    price: "",
    productCategory: "",
    featured: false,
    des: "",
    moduleSize: "",
    pixelPitch: "",
    pixelDensity: "",
    configuration: "",
    mode: "",
    resolution: "",
    driveType: "",
    refFreq: "",
    scanMode: "",
    portType: "",
    brightness: "",
    renFix: "",
    spec1: "",
    spec2: "",
    spec3: "",
    spec4: "",
    spec5: "",
    spec6: "",
    spec7: "",
    spec8: "",
    spec9: "",
    spec10: ""
  });

  // Fetch single carousel data when token and id change
  useEffect(() => {
    if (token && id) {
      getSingalProduct(id);
    }
  }, [token, id]);

  // Update productData with singleProduct when it changes
  useEffect(() => {
    if (singleProduct) {
      setProductData({
        productfile: singleProduct?.productfile?.url,
        imgpublicid: singleProduct?.productfile?.public_id,
        productname: singleProduct?.productname,
        sku: singleProduct?.sku,
        IndoorOutdoor: singleProduct?.IndoorOutdoor,
        price: singleProduct?.price,
        productCategory: singleProduct?.productCategory,
        featured: singleProduct?.featured,
        des: singleProduct?.description?.des,
        moduleSize: singleProduct?.description?.moduleSize,
        pixelPitch: singleProduct?.description?.pixelPitch,
        pixelDensity: singleProduct?.description?.pixelDensity,
        configuration: singleProduct?.description?.configuration,
        mode: singleProduct?.description?.mode,
        resolution: singleProduct?.description?.resolution,
        driveType: singleProduct?.description?.driveType,
        refFreq: singleProduct?.description?.refFreq,
        scanMode: singleProduct?.description?.scanMode,
        portType: singleProduct?.description?.portType,
        brightness: singleProduct?.description?.brightness,
        renFix: singleProduct?.description?.renFix,
        spec1: singleProduct?.description?.spec1,
        spec2: singleProduct?.description?.spec2,
        spec3: singleProduct?.description?.spec3,
        spec4: singleProduct?.description?.spec4,
        spec5: singleProduct?.description?.spec5,
        spec6: singleProduct?.description?.spec6,
        spec7: singleProduct?.description?.spec7,
        spec8: singleProduct?.description?.spec8,
        spec9: singleProduct?.description?.spec9,
        spec10: singleProduct?.description?.spec10
      });
    }
  }, [singleProduct]);

  // File change handler
  const handleFileChange = (e) => {
    const productfile = e.target.files[0]
    transforFile(productfile)
  }

  // Convert productfile to base64 and set to productData
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

  // Text input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value
    })
  }

  // Form submission handler
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateProduct(id, productData)
      navigate("/admin/products")
      // console.log('Form submitted:', productData);
      // Call an update function here to send updated productData to the backend
    } catch (error) {
      console.error(error)
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <AdminFormWrapper>
      <div className="container">
        <div className="contact-form">
          <form className="contact-inputs" onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={handleFileChange}
              placeholder="Product Image"
              name="productfile"
              autoComplete="off"
            />

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

            <input
              type="text"
              onChange={handleChange}
              value={productData.des}
              name="des"
              placeholder="Description Paragraph"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.moduleSize}
              name="moduleSize"
              placeholder="Module Size"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.pixelPitch}
              name="pixelPitch"
              placeholder="Pixel Pitch"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.pixelDensity}
              name="pixelDensity"
              placeholder="Pixel Density"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.configuration}
              name="configuration"
              placeholder="Configuration"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.mode}
              name="mode"
              placeholder="Mode"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.resolution}
              name="resolution"
              placeholder="Resolution"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.driveType}
              name="driveType"
              placeholder="Drive Type"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.refFreq}
              name="refFreq"
              placeholder="Ref Frequency"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.scanMode}
              name="scanMode"
              placeholder="Scan Mode"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.portType}
              name="portType"
              placeholder="Port Type"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.brightness}
              name="brightness"
              placeholder="Brightness"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.renFix}
              name="renFix"
              placeholder="Rental/Fixed"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec1}
              name="spec1"
              placeholder="Spec 1"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec2}
              name="spec2"
              placeholder="Spec 2"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec3}
              name="spec3"
              placeholder="Spec 3"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec4}
              name="spec4"
              placeholder="Spec 4"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec5}
              name="spec5"
              placeholder="Spec 5"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec6}
              name="spec6"
              placeholder="Spec 6"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec7}
              name="spec7"
              placeholder="Spec 7"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec8}
              name="spec8"
              placeholder="Spec 8"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec9}
              name="spec9"
              placeholder="Spec 9"
              autoComplete="off"
            />

            <input
              type="text"
              onChange={handleChange}
              value={productData.spec10}
              name="spec10"
              placeholder="Spec 10"
              autoComplete="off"
            />

            <Button type="submit">{isLoading ? <ActionLoading /> : "Update Product"}</Button>
          </form>
        </div>
      </div>
    </AdminFormWrapper>
  );
};

export default EditAdminProduct;

const AdminFormWrapper = styled.section`
margin: 3rem 0;
.contact-form {
        width: 100%;
        margin: auto;

        .text-success{
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          color:#38c8a8;
          margin-bottom: 3rem;
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
      }
`