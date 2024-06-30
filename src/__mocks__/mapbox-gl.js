// __mocks__/mapbox-gl.js
const mapboxgl = {
    Map: jest.fn(() => ({
      on: jest.fn(),
      remove: jest.fn(),
      addControl: jest.fn(),
      addLayer: jest.fn(),
      flyTo: jest.fn(),
      getSource: jest.fn(() => ({
        setData: jest.fn(),
      })),
      loadImage: jest.fn(),
      addImage: jest.fn(),
    })),
    NavigationControl: jest.fn(),
    GeolocateControl: jest.fn(),
    AttributionControl: jest.fn(),
    ScaleControl: jest.fn(),
    Marker: jest.fn(() => ({
      setLngLat: jest.fn(
        () => ({ 
          setPopup: jest.fn(() => ({ addTo: jest.fn() })),
        }),
      ),
      addTo: jest.fn(),
    })),
    Popup: jest.fn(() => ({
      setHTML: jest.fn(),
    })),
    
  };
  
  export default mapboxgl;
  