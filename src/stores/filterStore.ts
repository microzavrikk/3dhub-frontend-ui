import { defineStore } from 'pinia'

interface CategoryFilter {
  id: string
  name: string
  count: number
}

interface FormatFilter {
  format: string
  count: number
}

interface PriceRange {
  min: number
  max: number
}

interface SortOption {
  value: string
  label: string
}

interface FilterState {
  categories: CategoryFilter[]
  priceRange: PriceRange
  formats: FormatFilter[]
  tags: string[]
  sortOptions: SortOption[]
  assetName: string
  totalCount: number
  
  selectedCategories: string[]
  selectedPriceRange: PriceRange | null
  selectedFormats: string[]
  selectedTags: string[]
  selectedSort: string | null
  searchQuery: string
}

export const useFilterStore = defineStore('filter', {
  state: (): FilterState => ({
    categories: [],
    priceRange: { min: 0, max: 0 },
    formats: [],
    tags: [],
    sortOptions: [],
    assetName: '',
    totalCount: 0,

    selectedCategories: [],
    selectedPriceRange: null,
    selectedFormats: [],
    selectedTags: [],
    selectedSort: null,
    searchQuery: ''
  }),

  actions: {
    setDefaultFilters(filters: {
      categories: CategoryFilter[]
      priceRange: PriceRange
      formats: FormatFilter[]
      tags: string[]
      sortOptions: SortOption[]
      assetName: string
      totalCount: number
    }) {
      this.categories = filters.categories
      this.priceRange = filters.priceRange
      this.formats = filters.formats
      this.tags = filters.tags
      this.sortOptions = filters.sortOptions
      this.assetName = filters.assetName
      this.totalCount = filters.totalCount
    },

    setSelectedCategories(categories: string[]) {
      this.selectedCategories = categories
    },

    setSelectedPriceRange(range: PriceRange | null) {
      this.selectedPriceRange = range
    },

    setSelectedFormats(formats: string[]) {
      this.selectedFormats = formats
    },

    setSelectedTags(tags: string[]) {
      this.selectedTags = tags
    },

    setSelectedSort(sort: string | null) {
      this.selectedSort = sort
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    resetFilters() {
      this.selectedCategories = []
      this.selectedPriceRange = null
      this.selectedFormats = []
      this.selectedTags = []
      this.selectedSort = null
      this.searchQuery = ''
    }
  }
})
