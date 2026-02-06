import https from 'https';

let pineconeHost = null;
let pineconeApiKey = null;

/**
 * Make a REST request to Pinecone
 * @param {string} path - API path
 * @param {Object} data - Request body
 * @returns {Promise<Object>}
 */
const pineconeRequest = (path, data) => {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    const options = {
      hostname: pineconeHost,
      path,
      method: 'POST',
      headers: {
        'Api-Key': pineconeApiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(jsonData)
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
    req.write(jsonData);
    req.end();
  });
};

/**
 * Initialize Pinecone connection
 * @returns {Promise<boolean>} Whether initialization succeeded
 */
export const initPinecone = async () => {
  try {
    if (pineconeHost) {
      return true;
    }

    pineconeApiKey = process.env.PINECONE_API_KEY;
    const indexName = process.env.PINECONE_INDEX;
    
    // Derive host from index name pattern
    pineconeHost = `${indexName}-5ifzyrr.svc.aped-4627-b74a.pinecone.io`;
    
    console.log(`✅ Pinecone Connected: ${indexName}`);
    return true;
  } catch (error) {
    console.error(`❌ Pinecone Connection Error: ${error.message}`);
    return false;
  }
};

/**
 * Query Pinecone for similar vectors
 * @param {number[]} vector - The 5-dimensional ratio vector
 * @param {number} topK - Number of results to return
 * @returns {Promise<Array>} Array of matching celebrities
 */
export const querySimilar = async (vector, topK = 3) => {
  try {
    if (!pineconeHost) {
      await initPinecone();
    }

    if (!pineconeHost) {
      throw new Error('Pinecone not initialized');
    }

    const queryResponse = await pineconeRequest('/query', {
      vector,
      topK,
      includeMetadata: true,
    });

    return queryResponse.matches.map((match) => ({
      id: match.id,
      score: match.score,
      name: match.metadata?.name || 'Unknown',
      description: match.metadata?.description || '',
      advice: match.metadata?.advice || '',
      imageUrl: match.metadata?.imageUrl || null,
    }));
  } catch (error) {
    console.error('Pinecone query error:', error.message);
    return [];
  }
};

/**
 * Upsert vectors to Pinecone (for seeding)
 * @param {Array} vectors - Array of vector objects with id, values, metadata
 */
export const upsertVectors = async (vectors) => {
  try {
    if (!pineconeHost) {
      await initPinecone();
    }

    if (!pineconeHost) {
      throw new Error('Pinecone not initialized');
    }

    await pineconeRequest('/vectors/upsert', { vectors });
    console.log(`✅ Upserted ${vectors.length} vectors to Pinecone`);
    return true;
  } catch (error) {
    console.error('Pinecone upsert error:', error.message);
    return false;
  }
};

export { pineconeHost as pineconeIndex };
