import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CartScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [originalPrice, setOriginalPrice] = useState(141800); 
  const [shopDiscountPrice, setShopDiscountPrice] = useState(100000); 
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const generateDiscountCode = () => {
    const randomDiscount = Math.floor(Math.random() * 100);
    setDiscountPercentage(randomDiscount);
    setDiscountCode(`Mã giảm giá ${randomDiscount}%: GG${randomDiscount}`);
  };

  const applyDiscount = () => {
    generateDiscountCode(); 
    setIsDiscountApplied(true);
  };

  const calculateSubtotal = () => {
    return shopDiscountPrice * quantity; 
  };

  const calculateDiscountedPrice = () => {
    return shopDiscountPrice * quantity * (1 - discountPercentage / 100); 
  };

  const calculateDiscountAmount = () => {
    return shopDiscountPrice * quantity - calculateDiscountedPrice(); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Image
          source={{ uri: 'https://salt.tikicdn.com/cache/750x750/ts/product/b9/82/8a/467b81a449a9b28f252bb97865fd1bfc.jpg.webp' }} 
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Nguyên hàm tích phân và ứng dụng</Text>
          <Text style={styles.supplier}>Cung cấp bởi Tiki Trading</Text>
          {/* Original Price and Shop Discounted Price Display */}
          <Text style={styles.strikedPrice}>{originalPrice.toFixed(0)} đ</Text>
          <Text style={styles.discountedPrice}>{shopDiscountPrice.toFixed(0)} đ</Text>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
          <Text style={styles.buttonText}>+</Text>
</TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.laterText}>Mua sau</Text>
        </TouchableOpacity>
      </View>

      {/* Discount Section */}
      <View style={styles.discountSection}>
        <TextInput
          style={styles.discountInput}
          placeholder="Mã giảm giá"
          value={discountCode}
          editable={false}
        />
        <Button title="Áp dụng" color="#007BFF" onPress={applyDiscount} />
      </View>

      <View style={styles.priceSummary}>
        <Text style={styles.subtotalText}>Tạm tính</Text>
        <Text style={styles.subtotalPrice}>{calculateSubtotal().toFixed(0)} đ</Text>
      </View>

      {isDiscountApplied && (
        <Text style={styles.discountAmount}>
          {discountCode}: -{calculateDiscountAmount().toFixed(0)} đ
        </Text>
      )}

      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceLabel}>Thành tiền</Text>
        <Text style={styles.finalPrice}>{isDiscountApplied ? calculateDiscountedPrice().toFixed(0) : calculateSubtotal().toFixed(0)} đ</Text>
      </View>
      
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>TIẾN HÀNH ĐẶT HÀNG</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  productImage: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  supplier: {
    fontSize: 12,
    color: '#007BFF',
    marginBottom: 5,
  },
  strikedPrice: {
    fontSize: 14,
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  laterText: {
    marginLeft: 20,
    color: '#007BFF',
  },
  discountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  discountInput: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    marginRight: 10,
    padding: 5,
  },
  priceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  subtotalText: {
    fontSize: 14,
  },
  subtotalPrice: {
    fontSize: 14,
    color: 'red',
  },
  discountAmount: {
    fontSize: 14,
    color: 'red',
marginBottom: 5,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalPriceLabel: {
    fontSize: 16,
  },
  finalPrice: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
