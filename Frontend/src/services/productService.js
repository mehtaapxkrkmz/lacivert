import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/db'
import { productSchema } from '../schemas/productSchema'

// Schema validation function
const validateProduct = (product) => {
  const errors = []
  
  // Required fields check
  Object.entries(productSchema).forEach(([field, rules]) => {
    if (rules.required && !product[field]) {
      errors.push(`${field} is required`)
    }
  })

  // Type checks
  if (product.name && typeof product.name !== 'string') {
    errors.push('name must be a string')
  }
  if (product.photos && !Array.isArray(product.photos)) {
    errors.push('photos must be an array')
  }
  if (product.gender && !['Kadın', 'Erkek', 'Unisex'].includes(product.gender)) {
    errors.push('gender must be one of: Kadın, Erkek, Unisex')
  }
  if (product.sizes && !Array.isArray(product.sizes)) {
    errors.push('sizes must be an array')
  }
  if (product.oldPrice && typeof product.oldPrice !== 'number') {
    errors.push('oldPrice must be a number')
  }
  if (product.newPrice && typeof product.newPrice !== 'number') {
    errors.push('newPrice must be a number')
  }

  return errors
}

// Add new product
export const addProduct = async (productData) => {
  try {
    // Validate product data
    const errors = validateProduct(productData)
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(', ')}`)
    }

    // Add default values
    const product = {
      ...productData,
      inCart: productData.inCart ?? false,
      isFavorite: productData.isFavorite ?? false,
      isDiscounted: productData.isDiscounted ?? false,
      comments: productData.comments ?? []
    }

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'products'), product)
    return { id: docRef.id, ...product }
  } catch (error) {
    console.error('Error adding product:', error)
    throw error
  }
}

// Get all products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting products:', error)
    throw error
  }
}

// Update product
export const updateProduct = async (productId, productData) => {
  try {
    // Validate product data
    const errors = validateProduct(productData)
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(', ')}`)
    }

    const productRef = doc(db, 'products', productId)
    await updateDoc(productRef, productData)
    return { id: productId, ...productData }
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

// Delete product
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId))
    return productId
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
} 