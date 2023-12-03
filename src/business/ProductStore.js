import ProductImage1 from '../assets/images/image-product-1.jpg';
import ProductImage2 from '../assets/images/image-product-2.jpg';
import ProductImage3 from '../assets/images/image-product-3.jpg';
import ProductImage4 from '../assets/images/image-product-4.jpg';
import ProductImage1Thumb from '../assets/images/image-product-1-thumbnail.jpg';
import ProductImage2Thumb from '../assets/images/image-product-2-thumbnail.jpg';
import ProductImage3Thumb from '../assets/images/image-product-3-thumbnail.jpg';
import ProductImage4Thumb from '../assets/images/image-product-4-thumbnail.jpg';

export default class ProductStore {
  products = [
    {
      id: 1,
      name: "Fall Limited Edition Sneakers",
      price: 125,
      undiscountedPrice: 250,
      description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
      images: [
        { src: ProductImage1, thumb: ProductImage1Thumb, alt: "Product Image 1", width: 1000, height: 1000 },
        { src: ProductImage2, thumb: ProductImage2Thumb, alt: "Product Image 2", width: 1000, height: 1000 },
        { src: ProductImage3, thumb: ProductImage3Thumb, alt: "Product Image 3", width: 1000, height: 1000 },
        { src: ProductImage4, thumb: ProductImage4Thumb, alt: "Product Image 4", width: 1000, height: 1000 },
      ],
    }
  ]

  getProduct(id) {
    console.log(`Getting product with id ${id}`);
    return this.products.find((p) => p.id === id);
  }

  getFeaturedProduct() {
    return this.products[0];
  }
}
