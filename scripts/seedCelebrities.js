/**
 * Celebrity Seed Script for Pinecone
 * Populates the vector database with celebrity geometric signatures
 * 
 * Usage: node seedCelebrities.js
 */

import dotenv from 'dotenv';
import https from 'https';

// Load environment variables from server directory
dotenv.config({ path: '../server/.env' });

/**
 * Upsert vectors to Pinecone using REST API
 * @param {string} host - Pinecone index host
 * @param {string} apiKey - Pinecone API key
 * @param {Array} vectors - Array of vector objects
 * @returns {Promise}
 */
function upsertVectors(host, apiKey, vectors) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ vectors });
    const options = {
      hostname: host,
      path: '/vectors/upsert',
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Query vectors from Pinecone using REST API
 * @param {string} host - Pinecone index host
 * @param {string} apiKey - Pinecone API key  
 * @param {Array} vector - Query vector
 * @param {number} topK - Number of results
 * @returns {Promise}
 */
function queryVectors(host, apiKey, vector, topK = 3) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ vector, topK, includeMetadata: true });
    const options = {
      hostname: host,
      path: '/query',
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Celebrity data with geometric ratio vectors
// Vector format: [faceStructure, ruleOfFifths, nasalOral, verticalThirds, symmetry]
const celebrities = [
  // Male Celebrities
  {
    id: 'celeb_brad_pitt',
    values: [1.62, 1.00, 1.60, 1.01, 0.98],
    metadata: {
      name: 'Brad Pitt',
      description: 'Strong jawline with balanced proportions',
      advice: 'Aviator Sunglasses',
      category: 'male',
      era: 'modern',
    },
  },
  {
    id: 'celeb_george_clooney',
    values: [1.58, 0.98, 1.55, 1.02, 0.97],
    metadata: {
      name: 'George Clooney',
      description: 'Classic Hollywood proportions',
      advice: 'Wayfarer frames, salt-and-pepper styling',
      category: 'male',
      era: 'modern',
    },
  },
  {
    id: 'celeb_henry_cavill',
    values: [1.55, 1.02, 1.62, 0.98, 0.99],
    metadata: {
      name: 'Henry Cavill',
      description: 'Square jaw with heroic proportions',
      advice: 'Minimal frames, classic side part',
      category: 'male',
      era: 'modern',
    },
  },
  {
    id: 'celeb_idris_elba',
    values: [1.60, 0.96, 1.58, 1.05, 0.96],
    metadata: {
      name: 'Idris Elba',
      description: 'Distinguished features with strong bone structure',
      advice: 'Bold rectangular frames',
      category: 'male',
      era: 'modern',
    },
  },
  {
    id: 'celeb_ryan_gosling',
    values: [1.65, 1.01, 1.52, 1.00, 0.97],
    metadata: {
      name: 'Ryan Gosling',
      description: 'Balanced oval face with subtle features',
      advice: 'Round frames, textured hair',
      category: 'male',
      era: 'modern',
    },
  },
  {
    id: 'celeb_timothee_chalamet',
    values: [1.72, 1.03, 1.48, 0.95, 0.98],
    metadata: {
      name: 'Timothée Chalamet',
      description: 'Elongated face with delicate features',
      advice: 'Wide frames, wavy hair',
      category: 'male',
      era: 'modern',
    },
  },
  {
    id: 'celeb_david_beckham',
    values: [1.56, 0.99, 1.61, 1.03, 0.98],
    metadata: {
      name: 'David Beckham',
      description: 'Chiseled square jaw with refined proportions',
      advice: 'Round or oval frames, stubble',
      category: 'male',
      era: 'modern',
    },
  },
  {
    id: 'celeb_chris_hemsworth',
    values: [1.52, 0.97, 1.65, 1.02, 0.97],
    metadata: {
      name: 'Chris Hemsworth',
      description: 'Strong square face with masculine features',
      advice: 'Browline frames, longer hair',
      category: 'male',
      era: 'modern',
    },
  },

  // Female Celebrities
  {
    id: 'celeb_angelina_jolie',
    values: [1.64, 1.00, 1.70, 0.98, 0.99],
    metadata: {
      name: 'Angelina Jolie',
      description: 'Heart-shaped face with prominent features',
      advice: 'Cat-eye frames, side-swept hair',
      category: 'female',
      era: 'modern',
    },
  },
  {
    id: 'celeb_natalie_portman',
    values: [1.61, 1.02, 1.58, 1.00, 0.99],
    metadata: {
      name: 'Natalie Portman',
      description: 'Near-perfect golden ratio proportions',
      advice: 'Any frame style works beautifully',
      category: 'female',
      era: 'modern',
    },
  },
  {
    id: 'celeb_scarlett_johansson',
    values: [1.48, 0.98, 1.62, 1.05, 0.97],
    metadata: {
      name: 'Scarlett Johansson',
      description: 'Round face with soft, balanced features',
      advice: 'Angular cat-eye frames, voluminous hair',
      category: 'female',
      era: 'modern',
    },
  },
  {
    id: 'celeb_zendaya',
    values: [1.68, 1.01, 1.55, 0.97, 0.98],
    metadata: {
      name: 'Zendaya',
      description: 'Oval face with elegant proportions',
      advice: 'Oversized frames, versatile styling',
      category: 'female',
      era: 'modern',
    },
  },
  {
    id: 'celeb_margot_robbie',
    values: [1.54, 0.99, 1.60, 1.02, 0.98],
    metadata: {
      name: 'Margot Robbie',
      description: 'Square face with refined features',
      advice: 'Round frames, soft waves',
      category: 'female',
      era: 'modern',
    },
  },
  {
    id: 'celeb_lupita_nyongo',
    values: [1.59, 1.00, 1.63, 1.01, 0.99],
    metadata: {
      name: "Lupita Nyong'o",
      description: 'Balanced oval with striking symmetry',
      advice: 'Bold geometric frames',
      category: 'female',
      era: 'modern',
    },
  },

  // Classical Art & Historical Figures
  {
    id: 'art_david_michelangelo',
    values: [1.618, 1.00, 1.618, 1.00, 1.00],
    metadata: {
      name: 'David of Michelangelo',
      description: 'Perfect golden ratio - the Renaissance ideal',
      advice: 'The mathematical ideal of beauty',
      category: 'art',
      era: 'renaissance',
    },
  },
  {
    id: 'art_venus_botticelli',
    values: [1.62, 1.01, 1.60, 0.99, 0.99],
    metadata: {
      name: 'Venus (Botticelli)',
      description: 'Renaissance feminine ideal',
      advice: 'Classic timeless beauty',
      category: 'art',
      era: 'renaissance',
    },
  },
  {
    id: 'art_nefertiti',
    values: [1.70, 1.02, 1.58, 0.95, 0.98],
    metadata: {
      name: 'Queen Nefertiti',
      description: 'Ancient Egyptian beauty ideal',
      advice: 'Regal, elongated elegance',
      category: 'art',
      era: 'ancient',
    },
  },
  {
    id: 'celeb_alain_delon',
    values: [1.60, 0.99, 1.59, 1.01, 0.99],
    metadata: {
      name: 'Alain Delon',
      description: 'Classic French cinema perfection',
      advice: 'Timeless European style',
      category: 'male',
      era: 'classic',
    },
  },
  {
    id: 'celeb_audrey_hepburn',
    values: [1.66, 1.03, 1.52, 0.96, 0.99],
    metadata: {
      name: 'Audrey Hepburn',
      description: 'Elegant oval face with refined features',
      advice: 'Classic cat-eye, pixie or updo',
      category: 'female',
      era: 'classic',
    },
  },
  {
    id: 'celeb_james_dean',
    values: [1.58, 0.98, 1.55, 1.03, 0.97],
    metadata: {
      name: 'James Dean',
      description: 'Rebellious American icon',
      advice: 'Classic wayfarers, pompadour',
      category: 'male',
      era: 'classic',
    },
  },
  {
    id: 'celeb_grace_kelly',
    values: [1.61, 1.00, 1.59, 1.00, 0.99],
    metadata: {
      name: 'Grace Kelly',
      description: 'Aristocratic perfection',
      advice: 'Elegant frames, classic chignon',
      category: 'female',
      era: 'classic',
    },
  },
];

/**
 * Main seed function
 */
async function seedCelebrities() {
  console.log('🌟 GoldenAI Celebrity Seeder');
  console.log('============================\n');

  // Validate environment
  if (!process.env.PINECONE_API_KEY) {
    console.error('❌ PINECONE_API_KEY not found in environment');
    console.log('   Please set up your .env file in the server directory');
    process.exit(1);
  }

  if (!process.env.PINECONE_INDEX) {
    console.error('❌ PINECONE_INDEX not found in environment');
    process.exit(1);
  }

  // Pinecone index host (get this from the Pinecone console or API)
  const indexName = process.env.PINECONE_INDEX;
  const apiKey = process.env.PINECONE_API_KEY;
  
  // Derive host from index name pattern
  const host = `${indexName}-5ifzyrr.svc.aped-4627-b74a.pinecone.io`;

  try {
    console.log(`📡 Connecting to Pinecone index: ${indexName}...`);
    console.log(`✅ Using host: ${host}\n`);

    // Upsert vectors in batches using REST API
    console.log(`📤 Uploading ${celebrities.length} celebrity vectors...`);
    
    const batchSize = 10;
    
    for (let i = 0; i < celebrities.length; i += batchSize) {
      const batch = celebrities.slice(i, i + batchSize);
      console.log(`   Processing batch ${Math.floor(i / batchSize) + 1}: ${batch.length} records`);
      
      // Format records for Pinecone
      const vectors = batch.map(item => ({
        id: item.id,
        values: item.values,
        metadata: item.metadata
      }));
      
      if (vectors.length > 0) {
        const result = await upsertVectors(host, apiKey, vectors);
        console.log(`   ✓ Uploaded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(celebrities.length / batchSize)} (${result.upsertedCount} vectors)`);
      }
    }

    console.log('\n✅ Successfully seeded all celebrities!\n');

    // Print summary
    console.log('📊 Summary:');
    console.log(`   Total vectors: ${celebrities.length}`);
    console.log(`   Male: ${celebrities.filter(c => c.metadata.category === 'male').length}`);
    console.log(`   Female: ${celebrities.filter(c => c.metadata.category === 'female').length}`);
    console.log(`   Art/Historical: ${celebrities.filter(c => c.metadata.category === 'art').length}`);
    console.log(`   Modern era: ${celebrities.filter(c => c.metadata.era === 'modern').length}`);
    console.log(`   Classic era: ${celebrities.filter(c => c.metadata.era === 'classic').length}`);

    // Test query using REST API
    console.log('\n🔍 Testing with a sample query...');
    const testVector = [1.618, 1.0, 1.618, 1.0, 1.0]; // Perfect golden ratio
    const queryResult = await queryVectors(host, apiKey, testVector, 3);

    console.log('   Top 3 matches for perfect golden ratio:');
    queryResult.matches.forEach((match, i) => {
      console.log(`   ${i + 1}. ${match.metadata.name} (${(match.score * 100).toFixed(1)}% similarity)`);
    });

    console.log('\n🎉 Seeding complete! Your database is ready.');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    
    if (error.message.includes('not found')) {
      console.log('\n💡 Tip: Make sure your Pinecone index exists.');
      console.log('   Create a new index with:');
      console.log('   - Dimensions: 5');
      console.log('   - Metric: cosine');
    }
    
    process.exit(1);
  }
}

// Run the seeder
seedCelebrities();
