import React from 'react'

const EbookPreview = () => {
  return (
    <div>
      <h2>Ebook Preview</h2>

      <div>
        <div>
          <img src={null} alt="" />
          <p>Book Type: Ebook</p>
        </div>

        <div>
          <div>
            <p>The Psychology of Money</p>
            <p>$ 30.00</p>
          </div>
          <p>
            by <span>Chimdindu Ezulike</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EbookPreview