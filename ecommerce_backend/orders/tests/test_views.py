from django.urls import reverse
from .test_setup import TestSetup
from rest_framework import status

class TestViews(TestSetup):

    #test para ver si el usuario tiene una orden pendiente
    def test_user_can_see_if_has_pending_order(self):
        response = self.client.get(self.check_pending_order_url)
        
        self.assertEqual(response.status_code, 200)
        
        self.assertIn('has_pending', response.data)
        self.assertIn('order', response.data)
    
    def test_user_can_update_order_status(self):
        url = reverse('update_order_status', kwargs={'pk': self.order.id})
        data = {'status': 'shipped'}

        response = self.client.patch(url, data, format='json')

        self.order.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.order.status, 'shipped')
        self.assertEqual(response.data['status'], 'shipped')