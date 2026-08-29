import { JSONFilePreset } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'umkm-db.json');

const defaultData = { products: [] };
const db = await JSONFilePreset(dbPath, defaultData);

export function saveProduct(product) {
  db.data.products.unshift(product);
  db.write();
  return product;
}

export function getAllProducts() {
  return db.data.products;
}

export function deleteProduct(id) {
  db.data.products = db.data.products.filter((p) => p.id !== id);
  db.write();
}