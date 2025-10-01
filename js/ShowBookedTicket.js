document.addEventListener('DOMContentLoaded', () => {
            const ticketsContainer = document.getElementById('tickets-container');
            const noTicketsMessage = document.getElementById('no-tickets-message');
            
            const myTickets = JSON.parse(localStorage.getItem('my_tickets')) || [];

            if (myTickets.length === 0) {
                noTicketsMessage.classList.remove('hidden');
            } else {
                myTickets.forEach(booking => {
                    const ticketCard = `
                        <div class="ticket-card rounded-xl flex">
                            <div class="p-6 flex-grow">
                                <p class="text-sm font-semibold">Cine<span class="text-red-600">Book</span></p>
                                <h3 class="text-xl font-bold mt-1 gradient-text">Movie Ticket</h3>
                                <div class="mt-4 space-y-2 text-sm">
                                    <p><span class="font-semibold text-gray-400">Date:</span> ${booking.date}</p>
                                    <p><span class="font-semibold text-gray-400">Time:</span> ${booking.time}</p>
                                </div>
                            </div>
                            <div class="p-6 ticket-stub flex-shrink-0 flex flex-col justify-center items-center w-32">
                                <p class="text-xs text-gray-400 mb-1">SEATS</p>
                                <p class="text-lg font-bold text-center gradient-text">${booking.seats.join(', ')}</p>
                            </div>
                        </div>
                    `;
                    ticketsContainer.innerHTML += ticketCard;
                });
            }
        });