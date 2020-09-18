import React from 'react';
import { ResponsiveEmbed } from 'react-bootstrap';
 
const AddressMap=()=>{
  return (
    <div style={{height: 'auto' }}>
      <ResponsiveEmbed aspectRatio="16by9">
        <embed src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118830.37497975871!2d91.9328615837798!3d21.45088357869265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc7ea2ab928c3%3A0x3b539e0a68970810!2sCox&#39;s%20Bazar!5e0!3m2!1sen!2sbd!4v1600418752174!5m2!1sen!2sbd" />
      </ResponsiveEmbed>
    </div>
  );
}
export default AddressMap;