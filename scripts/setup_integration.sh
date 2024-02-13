DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker compose -f $DIR/../docker/integration.compose.yml up -d --remove-orphans
$DIR/wait-for-it.sh "localhost:$TEST_DB_PORT" -- echo "Integration Postgres is up"