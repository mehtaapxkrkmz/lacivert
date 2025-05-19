export const productSchema = {
  name: {
    type: 'string',
    required: true,
    minLength: 3,
    maxLength: 100
  },
  photos: {
    type: 'array',
    required: true,
    items: {
      type: 'string',
      format: 'url'
    }
  },
  gender: {
    type: 'string',
    required: true,
    enum: ['Kadın', 'Erkek', 'Unisex']
  },
  sizes: {
    type: 'array',
    required: true,
    items: {
      type: 'object',
      properties: {
        label: { type: 'string', required: true },
        value: { type: 'number', required: true }
      }
    }
  },
  inCart: {
    type: 'boolean',
    default: false
  },
  isFavorite: {
    type: 'boolean',
    default: false
  },
  isDiscounted: {
    type: 'boolean',
    default: false
  },
  oldPrice: {
    type: 'number',
    required: true,
    min: 0
  },
  newPrice: {
    type: 'number',
    required: true,
    min: 0
  },
  comments: {
    type: 'array',
    default: [],
    items: {
      type: 'object',
      properties: {
        user: { type: 'string', required: true },
        rating: { type: 'number', required: true, min: 1, max: 5 },
        text: { type: 'string', required: true }
      }
    }
  }
} 