export function slugger(slug) {
  if (!slug) return '';
  
  const newSlug = slug.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g,"");

  return newSlug;

};

