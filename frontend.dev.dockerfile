# Use Node.js 24 LTS Alpine
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy entrypoint script and make executable
COPY frontend.entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Set entrypoint and default command
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "dev"]
