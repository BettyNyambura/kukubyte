from database import db
from models import Booking, ChickenWeightStock, Chicken

def update_booking_weights():
    # Get the first chicken
    first_chicken = Chicken.query.first()
    if not first_chicken:
        print("Error: No chickens found in the database")
        return

    # Get a default weight, e.g., 1.5 kg
    stock = ChickenWeightStock.query.filter_by(chicken_id=first_chicken.id, weight=1.5).first()
    if not stock:
        print(f"Error: No stock found for chicken ID {first_chicken.id} with weight=1.5")
        return

    # Update all bookings
    bookings = Booking.query.all()
    updated_count = 0
    for booking in bookings:
        if booking.weight != stock.weight:
            booking.weight = stock.weight
            updated_count += 1

    db.session.commit()
    print(f"Updated {updated_count} bookings with weight {stock.weight} kg")

# Now run it:
update_booking_weights()
