# Hardcoded Content Audit

This document lists all hardcoded images and text found in the application that should ideally come from CMS.

## Summary

**Status**: ✅ Fixed most critical issues. Some hardcoded content remains but is acceptable (fallbacks, placeholders, or content that doesn't need CMS management).

## Fixed Issues ✅

### 1. Who We Are Page - Hero Image
- **File**: `src/components/home-care/WhoWeAreClient.jsx`
- **Issue**: Hero image was hardcoded to `/images/who%20we%20are%201.png`
- **Fix**: Now uses `hero?.imageSrc` from CMS with fallback
- **Status**: ✅ Fixed

### 2. Who We Are Page - Our Commitment Image
- **File**: `src/components/home-care/WhoWeAreClient.jsx`
- **Issue**: Our Commitment image was hardcoded to `/images/our%20commitment.png`
- **Fix**: Now uses `ourCommitment?.imageSrc` from CMS with fallback
- **Note**: CMS schema needs to be updated to include `image` field in `our-commitment` component
- **Status**: ✅ Fixed (code ready, CMS schema update needed)

### 3. Cache Times
- **Files**: 
  - `src/app/home-care/who-we-are/page.jsx`
  - `src/lib/strapi.js`
- **Issue**: Cache times were 60 seconds, delaying CMS updates
- **Fix**: Reduced to 30 seconds for faster updates
- **Status**: ✅ Fixed

## Remaining Hardcoded Content (Acceptable)

### 1. Footer Component
- **File**: `src/components/sections/Footer.jsx`
- **Status**: ⚠️ **UNUSED** - This component is not being used. `NewFooter` and `FooterClient` are used instead, which properly use CMS data via `getFooter()`
- **Action**: Consider removing this unused component

### 2. Blog Placeholder Images
- **File**: `src/components/blog/AllBlogsList.jsx`
- **Content**: Placeholder images array for blog posts without images
- **Status**: ✅ Acceptable - These are fallback placeholders when CMS has no image

### 3. Default Fallback Images
- **Files**: Various components
- **Content**: Default images like `/images/doctor.png` used as fallbacks
- **Status**: ✅ Acceptable - These are error fallbacks, not primary content

### 4. Footer Fallback Data
- **File**: `src/components/sections/FooterClient.jsx`
- **Content**: Default footer links, phone numbers, etc. used as fallbacks
- **Status**: ✅ Acceptable - These are fallbacks when CMS data is unavailable

### 5. Hardcoded Text in Components (Styling/Formatting)
- **Files**: 
  - `src/components/home-care/WhoWeAreClient.jsx` (lines 187-195)
  - `src/components/home-care/VisionMissionClient.jsx`
- **Content**: Text formatting logic (e.g., highlighting "Dr. Nadia Choudhry", "DHA certified")
- **Status**: ✅ Acceptable - These are presentation/formatting enhancements, not content. The actual text comes from CMS.

## CMS Schema Updates Needed

### 1. Our Commitment Component
- **File**: `backend/src/components/sections/our-commitment.json`
- **Action**: Add `image` field (type: `media`) to allow CMS image management
- **Current**: Only has `title`, `description`, `paragraph`
- **Needed**: Add `image` field

## Recommendations

1. **Remove Unused Footer Component**: Delete `src/components/sections/Footer.jsx` if confirmed unused
2. **Update CMS Schema**: Add `image` field to `our-commitment` component schema
3. **Monitor Cache Times**: Consider reducing cache times further if CMS updates need to appear faster (currently 30 seconds)
4. **Add Image Field to CMS**: For "Our Commitment" section, add image field in Strapi admin

## Testing Checklist

After fixes:
- [x] Hero image on who-we-are page uses CMS data
- [x] Our Commitment image ready for CMS (needs schema update)
- [x] Cache times reduced for faster updates
- [ ] Verify CMS image updates appear within 30 seconds
- [ ] Test fallback images work when CMS image is missing
- [ ] Verify no console errors when CMS images fail to load

## Notes

- Most hardcoded content found is either:
  1. Fallback/placeholder content (acceptable)
  2. Presentation logic (acceptable)
  3. Already fixed to use CMS data
- The main issue was hardcoded image paths that should use CMS data, which has been fixed
- Footer component (`Footer.jsx`) appears unused - `NewFooter` is the active component using CMS data
