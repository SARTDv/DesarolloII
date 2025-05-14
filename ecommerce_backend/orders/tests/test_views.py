from .test_setup import TestSetup

class TestViews(TestSetup):

    #test para ver si el usuario tiene una orden pendiente
    def test_user_can_see_if_has_pending_order(self):
        response = self.client.get(self.check_pending_order_url)
        
        self.assertEqual(response.status_code, 200)
        
        self.assertIn('has_pending', response.data)
        self.assertIn('order', response.data)
    
    