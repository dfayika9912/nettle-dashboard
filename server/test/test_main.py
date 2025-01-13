import unittest
from server.main import app, is_valid_year
from unittest.mock import patch

class TestMainApp(unittest.TestCase):
    def setUp(self):
        # Create a Flask test client
        self.app = app.test_client()
        self.app.testing = True

    def test_index_route(self):
        # Test the root endpoint '/'
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode('utf-8'), "Welcome to Natural Disaster Prediction API")

    def test_get_predictions_missing_year(self):
        # Test /predict_disasters without the 'year' parameter
        response = self.app.get('/predict_disasters')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Year parameter is missing'})

    def test_get_predictions_year_out_of_bounds(self):
        # Test /predict_disasters with out-of-bounds year
        response = self.app.get('/predict_disasters?year=-1')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Year is out of bounds'})

        response = self.app.get('/predict_disasters?year=4000')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Year is out of bounds'})

    @patch('main.predict_by_year')
    def test_get_predictions_valid_year(self, mock_predict_by_year):
        # Mock the predict_by_year function
        mock_response = {'message': 'Predictions for the year 2025'}
        mock_predict_by_year.return_value = mock_response

        response = self.app.get('/predict_disasters?year=2025')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, mock_response)

        # Ensure predict_by_year is called with the correct parameter
        mock_predict_by_year.assert_called_with(2025)

    def test_is_valid_year(self):
        # Test the is_valid_year utility function
        current_year = datetime.datetime.now().year

        self.assertTrue(is_valid_year(str(current_year)))  # Valid current year
        self.assertTrue(is_valid_year(str(current_year + 1)))  # Valid future year
        self.assertTrue(is_valid_year(str(current_year + 50)))  # Valid max future year
        self.assertFalse(is_valid_year(str(current_year + 51)))  # Beyond valid range
        self.assertFalse(is_valid_year("invalid"))  # Invalid input
        self.assertFalse(is_valid_year("-1"))  # Negative year
        self.assertFalse(is_valid_year("3001"))  # Year out of bounds

    def test_get_predictions_invalid_method(self):
        # Test /predict_disasters endpoint with POST (invalid method)
        response = self.app.post('/predict_disasters', data={'year': 2025})
        self.assertEqual(response.status_code, 405)

    def test_unknown_route(self):
        # Test an unknown route
        response = self.app.get('/unknown_route')
        self.assertEqual(response.status_code, 404)

if __name__ == "__main__":
    unittest.main()
