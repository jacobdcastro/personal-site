use actix_files::Files;
use actix_web::{middleware::Logger, App, HttpServer};
use log::info;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // initialize logger
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let port = 3000;
    info!("Starting development server at http://localhost:{}", port);

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            // serve files from the dist directory
            .service(Files::new("/", "dist").index_file("index.html"))
    })
    .bind(("127.0.0.1", port))?
    .run()
    .await
}
