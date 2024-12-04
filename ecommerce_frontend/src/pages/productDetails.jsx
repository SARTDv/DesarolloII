import React from 'react';
import axios from 'axios';

const ProductDetails = () => {
  const handleAddToCart = async () => {

    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Por favor, inicia sesión para añadir productos al carrito.');
        return;
    }
    
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/cart/addToCart/', 
                { token_key: token , product_id : 1}
            );
        alert('Producto añadido al carrito');
    } catch (error) {
        console.error('Error al añadir al carrito:', error);
        alert('Hubo un error al añadir el producto al carrito');
    }
};
  return (
    <div className="single-product-area section-padding-100 clearfix">
  <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-50">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Furniture</a></li>
            <li className="breadcrumb-item"><a href="#">Chairs</a></li>
            <li className="breadcrumb-item active" aria-current="page">white modern chair</li>
          </ol>
        </nav>
      </div>
    </div>

    <div className="row">
      <div className="col-12 col-lg-7">
        <div className="single_product_thumb">
          <div id="product_details_slider" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li className="active" data-target="#product_details_slider" data-slide-to="0" style={{ backgroundImage: 'url(img/product-img/pro-big-1.jpg)' }}></li>
              <li data-target="#product_details_slider" data-slide-to="1" style={{ backgroundImage: 'url(img/product-img/pro-big-2.jpg)' }}></li>
              <li data-target="#product_details_slider" data-slide-to="2" style={{ backgroundImage: 'url(img/product-img/pro-big-3.jpg)' }}></li>
              <li data-target="#product_details_slider" data-slide-to="3" style={{ backgroundImage: 'url(img/product-img/pro-big-4.jpg)' }}></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <a className="gallery_img" href="img/product-img/pro-big-1.jpg">
                  <img className="d-block w-100" src="img/product-img/pro-big-1.jpg" alt="First slide" />
                </a>
              </div>
              <div className="carousel-item">
                <a className="gallery_img" href="img/product-img/pro-big-2.jpg">
                  <img className="d-block w-100" src="img/product-img/pro-big-2.jpg" alt="Second slide" />
                </a>
              </div>
              <div className="carousel-item">
                <a className="gallery_img" href="img/product-img/pro-big-3.jpg">
                  <img className="d-block w-100" src="img/product-img/pro-big-3.jpg" alt="Third slide" />
                </a>
              </div>
              <div className="carousel-item">
                <a className="gallery_img" href="img/product-img/pro-big-4.jpg">
                  <img className="d-block w-100" src="img/product-img/pro-big-4.jpg" alt="Fourth slide" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-5">
        <div className="single_product_desc">
          <div className="product-meta-data">
            <div className="line"></div>
            <p className="product-price">$180</p>
            <a href="/productDetails">
              <h6>White Modern Chair</h6>
            </a>
            <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
              <div className="ratings">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
              </div>
              <div className="review">
                <a href="#">Write A Review</a>
              </div>
            </div>
            <p className="availability"><i className="fa fa-circle"></i> In Stock</p>
          </div>

          <div className="short_overview my-5">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?</p>
          </div>

          <form className="cart clearfix" method="post">
            <div className="cart-btn d-flex mb-50">
              <p>Qty</p>
              <div className="quantity">
                <span className="qty-minus" onClick={() => {
                  const effect = document.getElementById('qty');
                  const qty = parseInt(effect.value);
                  if (!isNaN(qty) && qty > 1) effect.value = qty - 1;
                  return false;
                }}>
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
                <input type="number" className="qty-text" id="qty" step="1" min="1" max="300" name="quantity" defaultValue="1" />
                <span className="qty-plus" onClick={() => {
                  const effect = document.getElementById('qty');
                  const qty = parseInt(effect.value);
                  if (!isNaN(qty)) effect.value = qty + 1;
                  return false;
                }}>
                  <i className="fa fa-caret-up" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <button onClick={handleAddToCart}  type="button" className="btn amado-btn">Add to cart</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ProductDetails;


